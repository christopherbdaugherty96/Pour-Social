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
