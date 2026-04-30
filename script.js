const guestInput = document.getElementById('guestCount');
const hoursInput = document.getElementById('serviceHours');
const tierInput = document.getElementById('drinkTier');
const mobileBarInput = document.getElementById('mobileBar');
const travelFeeInput = document.getElementById('travelFee');
const guestValue = document.getElementById('guestValue');
const hoursValue = document.getElementById('hoursValue');
const pricingOutput = document.getElementById('pricingOutput');

const POUR_SOCIAL_EMAIL = 'pour.social@example.com'; // Replace before launch.
const FORM_ENDPOINT = ''; // Optional: set to a Formspree/Basin/CRM endpoint.

const planningAssumptions = {
  drinksPerGuestPerHour: 0.95,
  liquorBottleYield: 14,
  wineGlassesPerBottle: 5,
  beersPerCase: 24,
  bartenderRatio: 60,
};

const packagePricing = {
  basic: { base: 450, includedBartenders: 1 },
  signature: { base: 750, includedBartenders: 2 },
  premium: { base: 1200, includedBartenders: 2 },
};

function money(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function recommendedBartenders(guests) {
  return Math.max(1, Math.ceil(guests / planningAssumptions.bartenderRatio));
}

function estimateTotalDrinks(guests, hours) {
  return Math.round(guests * hours * planningAssumptions.drinksPerGuestPerHour);
}

function renderPricing() {
  const guests = +guestInput.value;
  const hours = +hoursInput.value;
  const tier = tierInput.value;

  guestValue.textContent = guests;
  hoursValue.textContent = hours;

  const selectedPackage = packagePricing[tier];
  const bartenders = recommendedBartenders(guests);
  const extraBartenders = Math.max(0, bartenders - selectedPackage.includedBartenders);
  const extraBartenderCost = extraBartenders * 250;
  const additionalHours = Math.max(0, hours - 4);
  const extraHourCost = additionalHours * bartenders * 100;
  const mobileBarCost = +mobileBarInput.value;
  const travelFee = travelFeeInput.checked ? 75 : 0;
  const subtotal = selectedPackage.base + extraBartenderCost + extraHourCost + mobileBarCost + travelFee;
  const min = subtotal * 0.95;
  const max = subtotal * 1.08;
  const totalDrinks = estimateTotalDrinks(guests, hours);
  const balancedCocktailDrinks = Math.round(totalDrinks * 0.3);
  const liquorBottles = Math.ceil(balancedCocktailDrinks / planningAssumptions.liquorBottleYield);

  pricingOutput.innerHTML = `
    <p><strong>Estimated Service:</strong> ${money(min)} – ${money(max)}</p>
    <p><strong>Base Package:</strong> ${money(selectedPackage.base)}</p>
    <p><strong>Staff Recommended:</strong> ${bartenders} bartender(s)</p>
    <p><strong>Estimated Add-ons:</strong> ${money(extraBartenderCost + extraHourCost + mobileBarCost + travelFee)}</p>
    <p><strong>Planning Drinks:</strong> ${totalDrinks}</p>
    <p><strong>Balanced Cocktail Liquor Bottles:</strong> ${liquorBottles}</p>
    <p><small>Estimator uses ${planningAssumptions.drinksPerGuestPerHour} drinks per guest per hour and ${planningAssumptions.liquorBottleYield} cocktails per 750ml liquor bottle. Final quotes depend on event complexity, service style, and location.</small></p>
  `;
}

['input', 'change'].forEach((evt) => {
  guestInput.addEventListener(evt, renderPricing);
  hoursInput.addEventListener(evt, renderPricing);
  tierInput.addEventListener(evt, renderPricing);
  mobileBarInput.addEventListener(evt, renderPricing);
  travelFeeInput.addEventListener(evt, renderPricing);
});
renderPricing();

const alcoholForm = document.getElementById('alcohol-form');
const alcOutput = document.getElementById('alcoholOutput');

alcoholForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const guests = +document.getElementById('alcGuests').value;
  const hours = +document.getElementById('alcHours').value;
  const style = document.getElementById('alcStyle').value;
  const totalDrinks = estimateTotalDrinks(guests, hours);

  let beerPct = 0.4;
  let winePct = 0.3;
  let cocktailPct = 0.3;
  if (style === 'beerWine') {
    beerPct = 0.55;
    winePct = 0.45;
    cocktailPct = 0;
  }
  if (style === 'cocktail') {
    beerPct = 0.2;
    winePct = 0.2;
    cocktailPct = 0.6;
  }

  const beerCases = Math.ceil((totalDrinks * beerPct) / planningAssumptions.beersPerCase);
  const wineBottles = Math.ceil((totalDrinks * winePct) / planningAssumptions.wineGlassesPerBottle);
  const liquorBottles = Math.ceil((totalDrinks * cocktailPct) / planningAssumptions.liquorBottleYield);
  const iceLow = Math.ceil(guests * 1);
  const iceHigh = Math.ceil(guests * 1.5);

  alcOutput.innerHTML = `
    <p><strong>Estimated drinks:</strong> ${totalDrinks}</p>
    <p><strong>Beer cases:</strong> ${beerCases}</p>
    <p><strong>Wine bottles:</strong> ${wineBottles}</p>
    <p><strong>Liquor bottles:</strong> ${liquorBottles}</p>
    <p><strong>Ice estimate:</strong> ${iceLow}–${iceHigh} lb</p>
    <p><small>Planning estimate only. Clients provide alcohol and remain responsible for final purchase quantities. Pour Social coordinates staffing plus mixers, soda, juices, fruit, syrups, and garnishes.</small></p>
  `;
});

function collectBookingForm(form) {
  const fields = Array.from(form.querySelectorAll('input, select, textarea'));
  const labels = [
    'Full Name',
    'Phone Number',
    'Email Address',
    'Event Date',
    'Event Time',
    'Guest Count',
    'Expected Drinking Guests (21+)',
    'Event Location',
    'Event Type',
    'Selected Package',
    'Alcohol Plan',
    'Event Notes',
  ];

  return fields.reduce((data, field, index) => {
    const label = field.getAttribute('name') || field.getAttribute('placeholder') || labels[index] || `Field ${index + 1}`;
    data[label] = field.value;
    return data;
  }, {});
}

function buildEventLeadText(data) {
  const lines = [
    'POUR SOCIAL EVENT LEAD',
    '',
    ...Object.entries(data).map(([key, value]) => `${key}: ${value || '(not provided)'}`),
    '',
    'Nova intake prompt:',
    'Create an Event Card, identify missing information, estimate package/staffing fit, flag risk/compliance questions, and draft a client follow-up. Do not send anything without approval.',
  ];
  return lines.join('\n');
}

const bookingForm = document.getElementById('bookingForm');
const bookingNote = document.getElementById('bookingNote');

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = collectBookingForm(bookingForm);
    const eventLeadText = buildEventLeadText(data);

    if (FORM_ENDPOINT) {
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, eventLeadText }),
        });
        bookingNote.textContent = response.ok
          ? 'Thanks — your request was submitted. Pour Social will review the event details and follow up.'
          : 'Something went wrong submitting the form. Please email or text Pour Social directly.';
        bookingNote.classList.toggle('form-success', response.ok);
        bookingNote.classList.toggle('form-error', !response.ok);
        if (response.ok) bookingForm.reset();
      } catch {
        bookingNote.textContent = 'Something went wrong submitting the form. Please email or text Pour Social directly.';
        bookingNote.classList.add('form-error');
      }
      return;
    }

    const subject = 'Pour Social Event Quote Request';
    const body = `Hi Pour Social,\n\nI would like to request an event quote.\n\n${eventLeadText}`;
    window.location.href = `mailto:${POUR_SOCIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    bookingNote.textContent = 'Opening a prepared email with your event details. Review and send it to request a quote.';
  });
}

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatLog = document.getElementById('chatLog');

function assistantReply(message) {
  const q = message.toLowerCase();
  if (q.includes('staff') || q.includes('bartender')) return 'Pour Social coordinates bartender staffing based on guest count, package level, service needs, and event flow. Events are planned under one brand instead of depending on one solo bartender.';
  if (q.includes('100') && q.includes('alcohol')) return 'For around 100 guests over 4 hours, the planning model estimates about 380 drinks. A balanced event usually splits that across beer, wine, and cocktails, using 14 cocktails per 750ml liquor bottle for a safe planning yield.';
  if (q.includes('mixers') || q.includes('provide')) return 'Yes — Pour Social provides mixers, soda, juices, fruit, syrups, garnishes, and bar tools. Clients provide or pre-order alcohol.';
  if (q.includes('package') || q.includes('pricing')) return 'Current starting rates are Basic $450, Signature $750, and Premium/Wedding $1,200+. Final pricing depends on staffing, hours, setup, and location.';
  if (q.includes('menu') || q.includes('drink')) return 'We build menus around your event style. Most events run best with 2–3 signature cocktails plus beer, wine, and simple crowd favorites.';
  if (q.includes('nova') || q.includes('automation')) return 'Pour Social is designed to work with Nova as a governed event-operations assistant: lead review, event cards, quote drafts, alcohol plans, staff packets, and follow-up drafts — with human approval before external action.';
  return 'Great question. Submit the booking form with your date, guest count, and location and we will send a tailored recommendation.';
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (!userText) return;
  chatLog.insertAdjacentHTML('beforeend', `<p><strong>You:</strong> ${userText}</p>`);
  chatLog.insertAdjacentHTML('beforeend', `<p><strong>Assistant:</strong> ${assistantReply(userText)}</p>`);
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
  assistantToggle.textContent = expanded ? 'Ask Pour Social' : 'Open Planning Assistant';
});
