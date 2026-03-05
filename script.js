const guestInput = document.getElementById('guestCount');
const hoursInput = document.getElementById('serviceHours');
const tierInput = document.getElementById('drinkTier');
const mobileBarInput = document.getElementById('mobileBar');
const travelFeeInput = document.getElementById('travelFee');
const guestValue = document.getElementById('guestValue');
const hoursValue = document.getElementById('hoursValue');
const pricingOutput = document.getElementById('pricingOutput');

const packagePricing = {
  basic: { base: 450, includedBartenders: 1 },
  signature: { base: 750, includedBartenders: 2 },
  premium: { base: 1200, includedBartenders: 2 }
};

function renderPricing() {
  const guests = Number(guestInput.value);
  const hours = Number(hoursInput.value);
  const tier = tierInput.value;
  guestValue.textContent = guests;
  hoursValue.textContent = hours;

  const selectedPackage = packagePricing[tier];
  const bartenders = Math.max(1, Math.ceil(guests / 60));
  const extraBartenders = Math.max(0, bartenders - selectedPackage.includedBartenders);
  const extraBartenderCost = extraBartenders * 250;
  const additionalHours = Math.max(0, hours - 4);
  const extraHourCost = additionalHours * bartenders * 100;
  const mobileBarCost = Number(mobileBarInput.value);
  const travelFee = travelFeeInput.checked ? 75 : 0;
  const subtotal = selectedPackage.base + extraBartenderCost + extraHourCost + mobileBarCost + travelFee;
  const min = Math.round(subtotal * 0.95);
  const max = Math.round(subtotal * 1.08);
  const liquorBottles = Math.ceil((guests * hours * 0.3) / 16);

  pricingOutput.innerHTML = `
    <p><strong>Estimated Service:</strong> $${min.toLocaleString()} – $${max.toLocaleString()}</p>
    <p><strong>Base Package:</strong> $${selectedPackage.base.toLocaleString()}</p>
    <p><strong>Bartenders Needed:</strong> ${bartenders}</p>
    <p><strong>Estimated Add-ons:</strong> $${(extraBartenderCost + extraHourCost + mobileBarCost + travelFee).toLocaleString()}</p>
    <p><strong>Estimated Liquor Bottles:</strong> ${liquorBottles}</p>
    <p><small>Estimator uses current pricing-sheet assumptions: +$100 per bartender per additional hour, +$200–$400 mobile bar setup, and additional bartender range centered at $250.</small></p>
  `;
}

guestInput.addEventListener('input', renderPricing);
hoursInput.addEventListener('input', renderPricing);
tierInput.addEventListener('change', renderPricing);
mobileBarInput.addEventListener('change', renderPricing);
travelFeeInput.addEventListener('change', renderPricing);
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
    return 'Our current starting rates are Basic $450, Signature $750, and Premium/Wedding $1,200+. Extra hours are typically $100 per bartender per hour.';
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
