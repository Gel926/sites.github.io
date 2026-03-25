let lastNicks = [];

const prefixes = ["x", "xx", "i", "pro", "real", "dark", "neo", "ultra"];
const suffixes = ["x", "z", "yt", "pro", "gaming", "hd", "mc", "lol"];
const separators = ["", "_", ".", "-"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rarity(nick) {
  if (nick.length <= 6) return "EPIC";
  if (nick.length <= 10) return "RARE";
  return "COMMON";
}

function isShort(nick) {
  return nick.length <= 8;
}

function generateOne(words) {
  let base = words.join("");

  let shuffled = [...words].sort(() => Math.random() - 0.5).join("");

  let variants = [
    base,
    base.toLowerCase(),
    base.toUpperCase(),

    pick(prefixes) + base,
    base + pick(suffixes),

    "x" + base + "x",

    words[0] + pick(separators) + words.at(-1),

    shuffled,

    pick(prefixes) + words[0] + words.at(-1) + pick(suffixes)
  ];

  return pick(variants);
}

function generate() {
  let words = document.getElementById("input").value
    .trim()
    .split(" ")
    .filter(Boolean);

  if (words.length < 2) {
    document.getElementById("result").innerHTML = "need 2+ words";
    return;
  }

  let onlyShort = document.getElementById("shortOnly")?.checked;

  let result = [];
  let attempts = 0;

  while (result.length < 20 && attempts < 200) {
    attempts++;

    let nick = generateOne(words);

    if (onlyShort && !isShort(nick)) continue;

    result.push(nick);
  }

  lastNicks = result;

  document.getElementById("result").innerHTML =
    result.map(n => `${n} — ${rarity(n)}`).join("<br>");
}

function copyNick() {
  if (!lastNicks.length) return;

  navigator.clipboard.writeText(lastNicks[0]);

  document.getElementById("result").innerText = "copied!";
}