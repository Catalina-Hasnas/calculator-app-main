const togglerButton = document.querySelector("#toggler-button");

const setTheme = (theme) =>
  document.body.setAttribute("data-color-scheme", theme);

let circlePosition = undefined;

const circlePositionToThemeValueMapper = {
  1: { theme: "default", leftPosition: "20%" },
  2: { theme: "light", leftPosition: "50%" },
  3: { theme: "dark", leftPosition: "80%" },
};

const mapCirclePositionToThemeValue = () => {
  circlePosition = !circlePosition ? 1 : circlePosition;

  const { theme, leftPosition } =
    circlePositionToThemeValueMapper[circlePosition];

  const nextTheme =
    circlePosition === 3
      ? "default"
      : circlePositionToThemeValueMapper[circlePosition + 1].theme;

  togglerButton.setAttribute("aria-label", `switch to ${nextTheme} theme`);

  const circle = document.querySelector("#circle");
  circle.style.left = leftPosition;
  setTheme(theme);
};

const onTogglerButtonClick = (event) => {
  event.preventDefault();
  if (circlePosition === 3) {
    circlePosition = 1;
  } else {
    circlePosition++;
  }
  mapCirclePositionToThemeValue();
};

mapCirclePositionToThemeValue();

togglerButton.addEventListener("click", onTogglerButtonClick);
