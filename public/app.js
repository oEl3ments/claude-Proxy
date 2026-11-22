const form = document.getElementById("form");
const input = document.getElementById("q");
const go = document.getElementById("go");
const statusEl = document.getElementById("status");
const home = document.getElementById("home");
const view = document.getElementById("view");
const frame = document.getElementById("frame");
const current = document.getElementById("current");
const back = document.getElementById("back");

const SEARCH_URL = "https://html.duckduckgo.com/html/?q=";

// Turn whatever was typed into a full URL: address, bare domain, or search query.
function toUrl(raw) {
  const text = raw.trim();
  try {
    const u = new URL(text);
    if (u.protocol === "http:" || u.protocol === "https:") return u.toString();
  } catch {}
  if (!/\s/.test(text) && /^[\w-]+(\.[\w-]+)+(:\d+)?(\/.*)?$/.test(text)) return "https://" + text;
  return SEARCH_URL + encodeURIComponent(text);
}

async function setup() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers aren't available. Use localhost or HTTPS.");
  }
  await navigator.serviceWorker.register("/sw.js", { scope: __uv$config.prefix });
  const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
  const wisp = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
  await connection.setTransport("/epoxy/index.mjs", [{ wisp }]);
}

setup()
  .then(() => { go.disabled = false; statusEl.textContent = ""; })
  .catch((err) => { console.error(err); statusEl.textContent = "Setup failed: " + err.message; });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;
  const url = toUrl(input.value);
  current.textContent = url;
  frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
  home.hidden = true;
  view.hidden = false;
});

back.addEventListener("click", () => {
  frame.src = "about:blank";
  view.hidden = true;
  home.hidden = false;
  input.select();
});
