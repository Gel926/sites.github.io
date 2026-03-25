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

  let variants = [
    base,
    pick(prefixes) + base,
    base + pick(suffixes),
    "x" + base + "x",
    words.sort(() => Math.random() - 0.5).join(""),
    words.join(pick(separators)),
    pick(prefixes) + words[0] + words.at(-1),
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

  while (result.length < 20) {
    let nick = generateOne(words);

    if (onlyShort && !isShort(nick)) continue;

    result.push(nick);
  }

  lastNicks = result;

  document.getElementById("result").innerHTML =
    result.map(n => `${n} — ${rarity(n)}`).join("<br>");
}