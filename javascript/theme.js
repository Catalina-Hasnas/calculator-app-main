const togglerButton = document.querySelector("#toggler-button");

const setTheme = (theme) => document.body.setAttribute("color-scheme", theme);

let circlePosition = undefined;

const circlePositionToThemeValueMapper = {
  1: { theme: "default", leftPosition: "20%" },
  2: { theme: "light", leftPosition: "50%" },
  3: { theme: "dark", leftPosition: "80%" },
};

const mapCirclePositionToThemeValue = () => {
  circlePosition = !circlePosition ? 1 : circlePosition;

  const currentValue = circlePositionToThemeValueMapper[circlePosition].theme;

  const selectedRadio = document.querySelector(
    `input[type="radio"][value="${currentValue}"]`
  );
  const previouslySelectedRadio = document.querySelector(
    `input[type="radio"][checked=""]`
  );
  selectedRadio.setAttribute("checked", "");
  if (previouslySelectedRadio) {
    previouslySelectedRadio.removeAttribute("checked");
  }
  const circle = document.querySelector("#circle");
  circle.style.left =
    circlePositionToThemeValueMapper[circlePosition].leftPosition;
  setTheme(currentValue);
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
