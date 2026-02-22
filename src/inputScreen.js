import "./main.css";
import "./inputScreen.css";
import {
  animate,
  splitText,
  stagger,
  createTimeline,
  svg,
  split,
} from "animejs";

import { processInput } from "./processScreen.js";
import {
  addloadingIcon,
  removeLoadingIcon,
  addProcessText,
} from "./loadingIcon.js";

function errorWarn(container, warningText) {
  const textwarning = container.getElementsByClassName("text-warning")[0];
  container.classList.add("warn");
  textwarning.textContent = warningText;
  textwarning.style.opacity = 1;
  animate(container, {
    translateX: [0, 100, -100, 0],
    duration: 200,
    ease: "inOutSine",
  });
}

export function inputScreen() {
  const el = document.createElement("div");
  el.classList.add("input-screen");
  let warningText = "Please input a username.";

  el.innerHTML = `
    <div class="container-center">
    <div class="input-container">
      <input autocomplete="off" class="text" placeholder="Enter your username."></input>
      <div class="text-warning">${warningText}</div>
    </div>
    `;

  document.body.appendChild(el);

  //constant dom
  const $textarea = el.getElementsByClassName("text")[0];
  const $container = el.getElementsByClassName("input-container")[0];
  const $textwarning = el.getElementsByClassName("text-warning")[0];
  const $loadingContainer = el.getElementsByClassName("loading-container")[0];

  //Entrance animation
  const entranceAnim = animate(
    el.getElementsByClassName("input-container")[0],
    {
      translateY: [{ from: 100 }],
      filter: [{ from: "blur(50px)", duration: 1000 }],
      opacity: [{ from: 0 }],
      delay: 1000,
      ease: "outCirc",
      duration: 1500,
    },
  );

  entranceAnim.play();

  $textarea.addEventListener("focus", () => {
    $container.classList.remove("warn");
    $textwarning.style.opacity = 0;
  });

  //On enter pressed
  $textarea.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    //Check if it's empty
    if ($textarea.value.trim() === "") {
      errorWarn($container, "Please input a username.");
      return;
    }

    $container.classList.remove("warn");
    $textwarning.style.opacity = 0;
    addloadingIcon();
    $textarea.disabled = true;
    $container.classList.toggle("disabled");

    //Proceed for processing
    attemptProcess($container, $textarea.value);
  });
}

async function attemptProcess(container, data) {
  try {
    await processInput(data);
  } catch (error) {
    errorWarn(container, error.message);
  } finally {
    addProcessText("");
    removeLoadingIcon();
    container.getElementsByClassName("text")[0].disabled = false;
    container.classList.toggle("disabled");
    return;
  }
}
