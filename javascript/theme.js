const switcher = document.querySelector("#theme-switcher");

const doc = document.firstElementChild;

const setTheme = (theme) => doc.setAttribute("color-scheme", theme);

if (switcher)
  switcher.addEventListener("input", (e) => setTheme(e.target.value));
