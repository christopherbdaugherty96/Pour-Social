const guestInput = document.getElementById('guestCount');
const hoursInput = document.getElementById('serviceHours');
const tierInput = document.getElementById('drinkTier');
const guestValue = document.getElementById('guestValue');
const hoursValue = document.getElementById('hoursValue');
const pricingOutput = document.getElementById('pricingOutput');

const tierRates = { basic: 1.5, signature: 2.0, premium: 2.7 };

function renderPricing() {
  const guests = Number(guestInput.value);
  const hours = Number(hoursInput.value);
  const tier = tierInput.value;
  guestValue.textContent = guests;
  hoursValue.textContent = hours;

  const base = guests * hours * tierRates[tier];
  const min = Math.round(base * 0.9);
  const max = Math.round(base * 1.1);
  const bartenders = Math.max(1, Math.ceil(guests / 60));
  const liquorBottles = Math.ceil((guests * hours * 0.32) / 16);

  pricingOutput.innerHTML = `
    <p><strong>Estimated Service:</strong> $${min.toLocaleString()} – $${max.toLocaleString()}</p>
    <p><strong>Bartenders Needed:</strong> ${bartenders}</p>
    <p><strong>Estimated Liquor Bottles:</strong> ${liquorBottles}</p>
    <p><small>Fast quote only. Final pricing depends on menu, staffing windows, setup complexity, and venue logistics.</small></p>
  `;
}

guestInput.addEventListener('input', renderPricing);
hoursInput.addEventListener('input', renderPricing);
tierInput.addEventListener('change', renderPricing);
renderPricing();

const alcoholForm = document.getElementById('alcohol-form');
const alcOutput = document.getElementById('alcoholOutput');

function ceil(x) { return Math.ceil(x); }

alcoholForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const guests = Number(document.getElementById('alcGuests').value);
  const hours = Number(document.getElementById('alcHours').value);
  const style = document.getElementById('alcStyle').value;
  const totalDrinks = Math.round(guests * hours * 0.95);

  let beerPct = 0.4, winePct = 0.3, cocktailPct = 0.3;
  if (style === 'beerWine') {
    beerPct = 0.55; winePct = 0.45; cocktailPct = 0;
  }
  if (style === 'cocktail') {
    beerPct = 0.2; winePct = 0.2; cocktailPct = 0.6;
  }

  const beerCases = ceil((totalDrinks * beerPct) / 24);
  const wineBottles = ceil((totalDrinks * winePct) / 5);
  const liquorBottles = ceil((totalDrinks * cocktailPct) / 16);

  alcOutput.innerHTML = `
    <p><strong>Estimated drinks:</strong> ${totalDrinks}</p>
    <p><strong>Beer cases:</strong> ${beerCases}</p>
    <p><strong>Wine bottles:</strong> ${wineBottles}</p>
    <p><strong>Liquor bottles:</strong> ${liquorBottles}</p>
    <p><small>Pour Social provides mixers, soda, juices, fruit, syrups, and garnishes. Clients provide alcohol.</small></p>
  `;
});

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatLog = document.getElementById('chatLog');

function assistantReply(message) {
  const q = message.toLowerCase();
  if (q.includes('100') && q.includes('alcohol')) {
    return 'For ~100 guests over 4 hours: about 15 liquor bottles, 18 wine bottles, and 4–5 beer cases. We provide mixers and garnishes.';
  }
  if (q.includes('mixers') || q.includes('provide')) {
    return 'Yes — Pour Social provides mixers, soda, juices, fruit, syrups, garnishes, and bar tools. Clients provide alcohol.';
  }
  if (q.includes('package') || q.includes('pricing')) {
    return 'We offer Basic, Signature, and Premium service tiers. Use the pricing dial above for a quick estimate, then submit the booking form for a detailed quote.';
  }
  if (q.includes('menu') || q.includes('drink')) {
    return 'We can build a custom menu around your event vibe. Most events run best with 6–8 cocktails and 2–3 signature drinks.';
  }
  return 'Great question. For exact planning, submit the booking form with your date, guest count, and location and we will send a tailored recommendation.';
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (!userText) return;

  chatLog.insertAdjacentHTML('beforeend', `<p><strong>You:</strong> ${userText}</p>`);
  const reply = assistantReply(userText);
  chatLog.insertAdjacentHTML('beforeend', `<p><strong>Assistant:</strong> ${reply}</p>`);
  chatInput.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;
});

document.getElementById('year').textContent = new Date().getFullYear();


const assistantDock = document.getElementById('assistantDock');
const assistantToggle = document.getElementById('assistantToggle');

assistantToggle.addEventListener('click', () => {
  assistantDock.classList.toggle('is-collapsed');
  const expanded = !assistantDock.classList.contains('is-collapsed');
  assistantToggle.setAttribute('aria-expanded', String(expanded));
  assistantToggle.textContent = expanded ? 'Ask Pour Social' : 'Open AI Bartender';
});


const topbar = document.querySelector('.topbar');
const quoteButton = document.getElementById('quoteButton');

function scrollToSection(hash) {
  const id = hash.replace('#', '');
  const target = document.getElementById(id);
  if (!target) return;

  const navOffset = topbar ? topbar.offsetHeight + 8 : 0;
  const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#') return;

    const targetExists = document.querySelector(hash);
    if (!targetExists) return;

    event.preventDefault();
    scrollToSection(hash);
    history.replaceState(null, '', hash);
  });
});

if (quoteButton) {
  const bookingSection = document.getElementById(quoteButton.dataset.target);
  if (bookingSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        quoteButton.classList.toggle('is-in-booking', entry.isIntersecting);
        quoteButton.textContent = entry.isIntersecting ? 'Booking Form ↓' : 'Request Quote • 60 sec';
      },
      { threshold: 0.45 }
    );
    observer.observe(bookingSection);
  }
}


// Planner wizard + drink menu generator
const planner = {
  step: 1,
  max: 5,
  stepsEl: Array.from(document.querySelectorAll('#wizardSteps span')),
  panels: Array.from(document.querySelectorAll('.wizard-panel')),
  prev: document.getElementById('wizPrev'),
  next: document.getElementById('wizNext'),
  summary: document.getElementById('wizardSummary'),
  menuOutput: document.getElementById('menuOutput')
};

function showWizardStep(step) {
  planner.step = Math.min(planner.max, Math.max(1, step));
  planner.panels.forEach((panel) => {
    panel.classList.toggle('hidden', Number(panel.dataset.step) != planner.step);
  });
  planner.stepsEl.forEach((dot, idx) => dot.classList.toggle('is-active', idx + 1 === planner.step));
  planner.prev.disabled = planner.step === 1;
  planner.next.textContent = planner.step === planner.max ? 'Generate Summary' : 'Next';
}

function generateDrinkMenu() {
  const selected = Array.from(document.querySelectorAll('.chip-grid input:checked')).map((c) => c.value);
  const map = {
    vodka: ['Lavender Lemon Drop', 'Cosmopolitan'],
    tequila: ['Classic Margarita', 'Paloma'],
    citrus: ['French 75', 'Citrus Spritz'],
    sweet: ['Rum Punch', 'Peach Bellini'],
    refreshing: ['Moscow Mule', 'Cucumber Gin Cooler'],
    whiskey: ['Old Fashioned', 'Whiskey Sour']
  };
  const drinks = [...new Set(selected.flatMap((k) => map[k] || []))].slice(0, 8);
  planner.menuOutput.innerHTML = drinks.length
    ? `<p><strong>Generated Signature Menu</strong></p><ul>${drinks.map((d) => `<li>${d}</li>`).join('')}</ul>`
    : '<p>Select at least one style to generate your menu.</p>';
  return drinks;
}

function calculateAlcoholForPlanner(guests, hours, style) {
  const total = Math.round(guests * hours * 0.95);
  const split = {
    beerWine: [0.55, 0.45, 0],
    classic: [0.35, 0.25, 0.4],
    signature: [0.25, 0.2, 0.55],
    full: [0.3, 0.2, 0.5]
  }[style] || [0.4, 0.3, 0.3];
  return {
    total,
    beerCases: Math.ceil((total * split[0]) / 24),
    wineBottles: Math.ceil((total * split[1]) / 5),
    liquorBottles: Math.ceil((total * split[2]) / 16)
  };
}

function buildPlannerSummary() {
  const guests = Number(document.getElementById('wizGuests').value || 0);
  const hours = Number(document.getElementById('wizHours').value || 0);
  const pack = document.getElementById('wizPackage').value.toLowerCase();
  const style = document.getElementById('wizStyle').value;
  const type = document.getElementById('wizType').value;
  const date = document.getElementById('wizDate').value || 'TBD';
  const location = document.getElementById('wizLocation').value || 'TBD';

  const rates = { basic: 1.5, signature: 2.0, premium: 2.7 };
  const base = guests * hours * (rates[pack] || 2);
  let min = Math.round(base * 0.9);
  let max = Math.round(base * 1.1);

  const addOns = [
    document.getElementById('addonBar').checked ? 150 : 0,
    document.getElementById('addonBoard').checked ? 85 : 0,
    document.getElementById('addonExtraHour').checked ? 200 : 0
  ].reduce((a, b) => a + b, 0);
  min += addOns;
  max += addOns;

  const menu = generateDrinkMenu();
  const alcohol = calculateAlcoholForPlanner(guests, hours, style);
  const bartenders = Math.max(1, Math.ceil(guests / 60));

  planner.summary.innerHTML = `
    <p><strong>Pour Social Event Summary</strong></p>
    <p>${type} • ${date} • ${location}</p>
    <p><strong>Guests:</strong> ${guests} | <strong>Hours:</strong> ${hours} | <strong>Package:</strong> ${pack[0].toUpperCase() + pack.slice(1)}</p>
    <p><strong>Bartenders Required:</strong> ${bartenders}</p>
    <p><strong>Estimated Service Price:</strong> $${min.toLocaleString()} – $${max.toLocaleString()}</p>
    <p><strong>Alcohol Plan:</strong> ${alcohol.liquorBottles} liquor bottles, ${alcohol.wineBottles} wine bottles, ${alcohol.beerCases} beer cases</p>
    <p><strong>Generated Menu:</strong> ${menu.join(', ') || 'Not selected yet'}</p>
    <p><small>Next step: connect this summary to Supabase/Firebase + Stripe for fully automated booking and deposit collection.</small></p>
  `;
}

if (planner.prev && planner.next) {
  showWizardStep(1);
  planner.prev.addEventListener('click', () => showWizardStep(planner.step - 1));
  planner.next.addEventListener('click', () => {
    if (planner.step < planner.max) {
      showWizardStep(planner.step + 1);
      if (planner.step === planner.max) buildPlannerSummary();
      return;
    }
    buildPlannerSummary();
  });
  document.getElementById('generateMenu')?.addEventListener('click', generateDrinkMenu);
}
