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

function generateOne(words) {
  let base = words.join("");
  let shuffled = [...words].sort(() => Math.random() - 0.5).join("");

  let variants = [
    base,
    pick(prefixes) + base,
    base + pick(suffixes),
    "x" + base + "x",
    words[0] + pick(separators) + words.at(-1),
    shuffled
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

  while (result.length < 5 && attempts < 100) {
    attempts++;

    let nick = generateOne(words);

    if (onlyShort && nick.length > 8) continue;

    result.push(nick);
  }

  document.getElementById("result").innerHTML =
    result.map(n => `${n} — ${rarity(n)}`).join("<br>");
}