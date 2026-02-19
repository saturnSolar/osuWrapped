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

function loadingAnimation(element) {
  let spinner = element.getElementsByClassName("spinner")[0];
  const timeline = createTimeline({
    autoplay: false,
    loop: true,
    defaults: {
      duration: 800,
      ease: "inOutExpo",
    },
    onComplete: (self) => (element.style.opacity = 0),
    onBegin: (self) => (element.style.opacity = 100),
  });

  timeline
    .add(spinner, { rotate: 180 }, 0)
    .add(element, { rotate: 180 }, "<")
    .add(spinner, { rotate: 360 }, "<")
    .add(element, { rotate: 360 }, "<");
  return timeline;
}

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
    <div class="loading-container">
      <div class="loader-container">
        <svg width="60" height="60" viewBox="0 0 50 50" class="spinner">
          <circle cx="25" cy="25" r="20"/>
        </svg>
      </div>
      <div class="process-container">
        <p class="text-process"></p>
      </div>
    </div>
    `;

  document.body.appendChild(el);

  //constant dom
  const $textarea = el.getElementsByClassName("text")[0];
  const $container = el.getElementsByClassName("input-container")[0];
  const $textwarning = el.getElementsByClassName("text-warning")[0];
  const $loadingContainer = el.getElementsByClassName("loading-container")[0];

  //Entrance animation
  let entranceAnim = animate(el.getElementsByClassName("input-container")[0], {
    translateY: [{ from: 100 }],
    filter: [{ from: "blur(50px)", duration: 1000 }],
    opacity: [{ from: 0 }],
    delay: 1000,
    ease: "outCirc",
    duration: 1500,
  });

  //Animations
  let loadingAnim = loadingAnimation(
    $loadingContainer.getElementsByClassName("loader-container")[0],
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

    if ($textarea.value.trim() === "") {
      errorWarn($container, "Please input a username.");
      return;
    }

    $container.classList.remove("warn");
    $textwarning.style.opacity = 0;
    loadingAnim.restart();
    $textarea.disabled = true;
    $container.classList.toggle("disabled");
    attemptProcess($container, $textarea.value);
  });
}

async function attemptProcess(container, data) {
  const loadingAnim = loadingAnimation(
    document
      .getElementsByClassName("input-screen")[0]
      .getElementsByClassName("loader-container")[0],
  );

  try {
    await processInput(data);
  } catch (error) {
    errorWarn(container, error.message);
  } finally {
    addProcessText("");
    loadingAnim.complete();
    container.getElementsByClassName("text")[0].disabled = false;
    container.classList.toggle("disabled");
    return;
  }
}

export function addProcessText(text) {
  const $processcontainer =
    document.getElementsByClassName("process-container")[0];
  const $texts = $processcontainer.getElementsByClassName("text-process");
  const duration = 400;

  $processcontainer.classList.add("show");

  if ($texts) {
    animate($texts[0], {
      opacity: 0,
      translateY: 20,
      filter: [{ to: "blur(5px)" }],
      duration: duration,
      onBegin: (self) => $texts[0].classList.add("leave"),
      onComplete: (self) => $texts[0].remove(),
    });
  }
  const $new_text = document.createElement("p");
  return new Promise((resolve) => {
    $new_text.classList.add("text-process");
    $new_text.textContent = text;
    $processcontainer.appendChild($new_text);
    animate($new_text, {
      opacity: [0, 1],
      translateY: [-20, 0],
      filter: [{ from: "blur(5px)" }],
      duration: duration,
      onBegin: (self) => $new_text.classList.add("enter"),
      onComplete: (self) => {
        $new_text.classList.remove("enter");
        resolve("the");
      },
    });
  });
}
