let count = 0;
let multiplier = 1;
let passiveIncome = 0;
let upgrades = [
  { name: 'Запуск Темки', baseCost: 100, effect: () => passiveIncome += 1 },
  { name: 'Автоклик', baseCost: 300, effect: () => passiveIncome += 3 },
  { name: 'Мозговой штурм', baseCost: 1000, effect: () => passiveIncome += 7 },
  { name: 'Пиар-компания', baseCost: 3000, effect: () => passiveIncome += 15 },
  { name: 'Инвесторы', baseCost: 10000, effect: () => passiveIncome += 30 },
];
let upgradeCounts = Array(upgrades.length).fill(0);
let lastClickTime = 0;
let clicks = 0;

const countElem = document.getElementById('count');
const button = document.getElementById('clicker-button');
const cpsElem = document.getElementById('cps');
const upgradePanel = document.getElementById('upgrade-panel');
const shopPanel = document.getElementById('shop-panel');
const clickEffects = document.getElementById('click-effects');

function updateCountDisplay() {
  countElem.textContent = `${Math.floor(count)} рублей`;
}

function spawnClickEffect(text) {
  const effect = document.createElement('div');
  effect.className = 'effect';
  effect.textContent = text;
  effect.style.left = `${Math.random() * 80 + 10}%`;
  effect.style.top = `${Math.random() * 80 + 10}%`;
  clickEffects.appendChild(effect);
  setTimeout(() => clickEffects.removeChild(effect), 1000);
}

button.addEventListener('click', () => {
  count += multiplier;
  clicks++;
  updateCountDisplay();
  spawnClickEffect(`+${multiplier}`);
});

setInterval(() => {
  count += passiveIncome;
  updateCountDisplay();
}, 1000);

setInterval(() => {
  cpsElem.textContent = `Кликов в секунду: ${clicks}`;
  clicks = 0;
}, 1000);

function createUpgradeButtons() {
  upgradePanel.innerHTML = '';
  upgrades.forEach((upg, index) => {
    const button = document.createElement('div');
    const price = Math.floor(upg.baseCost * Math.pow(2.3, upgradeCounts[index]));
    button.className = 'upgrade';
    button.textContent = `${upg.name} (${price}₽)`;
    button.onclick = () => {
      if (count >= price) {
        count -= price;
        upgradeCounts[index]++;
        upg.effect();
        updateCountDisplay();
        createUpgradeButtons();
      }
    };
    upgradePanel.appendChild(button);
  });
}

document.getElementById('upgrade-toggle').onclick = () => {
  upgradePanel.classList.toggle('hidden');
};

document.getElementById('menu-btn').onclick = () => {
  shopPanel.classList.toggle('hidden');
};

document.getElementById('x3').onclick = () => {
  multiplier *= 3;
};

document.getElementById('x4').onclick = () => {
  multiplier *= 4;
};

document.getElementById('money').onclick = () => {
  count += 10000;
  updateCountDisplay();
};

document.getElementById('tg').onclick = () => {
  window.open('https://t.me/KinoRust', '_blank');
};

createUpgradeButtons();
updateCountDisplay();
