function normalize(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function servicioSearchText(svc) {
  const itemsText = (svc.items || []).map((i) => i.label).join(" ");
  return normalize(
    [svc.nombre, svc.subtitulo, svc.descripcion, itemsText]
      .filter(Boolean)
      .join(" "),
  );
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function fuzzyMatch(word, textWords) {
  const maxDist = word.length <= 5 ? 1 : 2;
  for (const tw of textWords) {
    if (Math.abs(tw.length - word.length) > maxDist) continue;
    if (levenshtein(word, tw) <= maxDist) return true;
  }
  return false;
}

function scoreMatch(svcText, query) {
  const text = normalize(svcText);
  const q = normalize(query);

  if (text.includes(q)) return 100;

  const queryWords = q.split(" ").filter(Boolean);
  if (queryWords.length === 0) return 0;

  const textWords = text.split(" ").filter(Boolean);

  const matchedWords = queryWords.filter(
    (word) => text.includes(word) || fuzzyMatch(word, textWords),
  );

  if (matchedWords.length === 0) return 0;

  const ratio = matchedWords.length / queryWords.length;
  return Math.round(100 * ratio) + matchedWords.length * 5;
}

export function searchServicios(serviciosList, query) {
  if (!query) return serviciosList;

  const scored = serviciosList
    .map((s) => ({
      servicio: s,
      score: scoreMatch(servicioSearchText(s), query),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((s) => s.servicio);
}
