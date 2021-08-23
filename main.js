window.texme = { renderOnLoad: false, style: "plain" };

const styles = `
body {
  margin: 2em;
  color: #333;
}
@media screen and (min-width: 1024px) {
  body {
    max-width: 800px;
    margin: 2em auto;
  }
}
`;
let stylesheetLoaded = false;
async function ensureStyles() {
  if (stylesheetLoaded) return;

  return new Promise((resolve) => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = styles;
    document.head.appendChild(styleEl);
    styleEl.onload = () => {
      stylesheetLoaded = true;
      resolve();
    };
  });
}

let texmeLoaded = false;
async function ensureTexme() {
  if (texmeLoaded) return;

  return new Promise((resolve) => {
    const scriptEl = document.createElement("script");
    scriptEl.src = "https://cdn.jsdelivr.net/npm/texme@1.0.0";
    document.head.appendChild(scriptEl);
    scriptEl.onload = () => {
      texmeLoaded = true;
      resolve();
    };
  });
}

let doc = "";
async function fetchMain() {
  const res = await fetch(window.location.pathname);
  const body = await res.text();
  const newDoc = texme.render(body);
  if (doc !== newDoc) {
    document.body.innerHTML = newDoc;
    MathJax.typeset();
    doc = newDoc;
  }
}

async function main() {
  await ensureStyles();
  await ensureTexme();
  fetchMain();
  setInterval(() => fetchMain(), 1000);
}

main();
