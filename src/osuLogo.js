export function showOsuLogo() {
  const el = document.createElement("div");
  el.innerHTML = `<div class="logo-container off">
    <svg
      class="osulogo"
      width="930"
      height="930"
      viewBox="0 0 930 930"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="465"
        cy="465"
        r="440"
        stroke="#FEFEFE"
        stroke-width="50"
        stroke-linecap="round"
      />
      <rect
        x="169"
        y="402"
        width="145"
        height="153"
        rx="72.5"
        stroke="#FEFEFE"
        stroke-width="41"
        stroke-linecap="round"
      />
      <path
        d="M376 533.5C396.5 556.5 481.671 569 484.5 519.5C487.671 464 383.5 488.499 383.5 440C383.5 391.5 444.5 396.5 477 416"
        stroke="#FEFEFE"
        stroke-width="41"
        stroke-linecap="round"
      />
      <path
        d="M550 407V499.5C550 499.5 553.5 554 610.75 554C668 554 671.5 499.5 671.5 499.5V407"
        stroke="#FEFEFE"
        stroke-width="42"
        stroke-linecap="round"
      />
      <path
        d="M752 349.5V473.5"
        stroke="#FEFEFE"
        stroke-width="42"
        stroke-linecap="round"
      />
      <path
        d="M752 544V548"
        stroke="#FEFEFE"
        stroke-width="52"
        stroke-linecap="round"
      />
    </svg>
    <div class="logo-text">osu!wrapped</div>
    <p class="comingsoon">coming soon brah</p>

    </div>`;

  document.appendChild(el);
}
