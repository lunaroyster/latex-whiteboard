window.texme = { renderOnLoad: false, style: "plain" };

const styles = `
body {
  margin: 2em;
  color: #333;
}
a {
  color: #006363;
  text-decoration: unset;
  transition: 0.1s;
}
a:hover {
  background: #00636318;
}
code {
  background: #f8f3f3;
  padding: 2px;
  border-radius: 4px;
  color: #a13f00;
}
pre code {
  background: unset;
  color: unset;
  padding: unset;
  border-radius: unset;
}
pre {
  background: #f8f8f8;
  padding: 1em;
  border-radius: 8px;
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
