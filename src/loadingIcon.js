import "./main.css";
import "./loadingIcon.css";
import {
  animate,
  splitText,
  stagger,
  createTimeline,
  svg,
  split,
} from "animejs";

let loadingIcon;

export function addloadingIcon() {
  const mainDiv = document.createElement("div");
  mainDiv.id = "loading-icon-bg";
  mainDiv.className = "flex items-center justify-center absolute w-full h-full";
  mainDiv.innerHTML = `
    <div id="loading-container">
      <div id="loader-container">
        <svg width="60" height="60" viewBox="0 0 50 50" id="spinner">
          <circle cx="25" cy="25" r="20"/>
        </svg>
      </div>
      <div id="process-container">
        <p class="text-process"></p>
      </div>
    </div>
  `;
  document.body.appendChild(mainDiv);
  loadingIcon = mainDiv;

  const $loaderContainer = mainDiv.querySelector("#loader-container");

  const loadingAnim = loadingAnimation($loaderContainer);

  return mainDiv;
}

export function removeLoadingIcon() {
  if (!loadingIcon) {
    throw new Error("Loading icon not found");
    return;
  }
  const $loaderContainer = loadingIcon.querySelector("#loader-container");
  animate($loaderContainer, {
    opacity: 0,
    onComplete: () => {
      loadingIcon.remove();
    },
  });
}

const loadingAnimation = (element) => {
  let spinner = element.querySelector("#spinner");
  const timeline = createTimeline({
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
};

const textFadeDuration = 400;

const animateOut = (element, onComplete) => {
  animate(element, {
    opacity: 0,
    translateY: 20,
    filter: [{ to: "blur(5px)" }],
    duration: textFadeDuration,
    onBegin: (self) => element.classList.add("leave"),
    onComplete: onComplete,
  });
};

const animateIn = (element, onComplete) => {
  animate(element, {
    opacity: [0, 1],
    translateY: [-20, 0],
    filter: [{ from: "blur(5px)" }],
    duration: textFadeDuration,
    onBegin: (self) => element.classList.add("enter"),
    onComplete: onComplete,
  });
};

export function addProcessText(text) {
  const $processcontainer = loadingIcon.querySelector("#process-container");
  const $texts = $processcontainer.getElementsByClassName("text-process");

  if ($texts) {
    animateOut($texts[0], () => {
      $texts[0].remove();
    });
  }
  const $new_text = document.createElement("p");
  return new Promise((resolve) => {
    $new_text.classList.add("text-process");
    $new_text.textContent = text;
    $processcontainer.appendChild($new_text);
    animateIn($new_text, () => {
      $new_text.classList.remove("enter");
      resolve();
    });
  });
}
