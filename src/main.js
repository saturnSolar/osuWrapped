import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {animate, splitText, stagger, createTimeline, svg, split} from 'animejs'

//Container containing the textarea and buffer
const $container = document.querySelector('.container');
const $textarea = $container.getElementsByClassName('text')[0];
const $textwarning = $container.getElementsByClassName('text-warning')[0];
const $buffer = $container.querySelector('.loader-container');
const $logocontainer = document.querySelector('.logo-container');
const $osulogo = $logocontainer.querySelector('.osulogo');
const $logotext = $logocontainer.querySelector('.logo-text')
//Animate the textarea intro.
animate($container,
  {
    translateY: [
      {from: 100}
    ],
    filter: [
      {from: 'blur(50px)', duration: 1000}
    ],
    opacity: [{from: 0}],
    delay: 1000,
    ease: 'outCirc',
    duration: 1500
  }
);

//Animate visual feedback when in focus.
let anim = animate($container,
  {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.43)',
    duration: 200,
    autoplay: false
  }
)

//Add event listener for when the textarea is focused or blurred.
$textarea.addEventListener('focus', () => {
  anim.play();
  $container.classList.remove('warn');
  $textwarning.style.opacity = 0;
});
$textarea.addEventListener('blur', () => anim.reverse());

$textarea.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  e.preventDefault();


  if ($textarea.value.trim() === '') {
    $container.classList.add('warn');
    $textwarning.style.opacity = 1;
    animate($container, {
      translateX: [0, 50, -50, 0],
      duration: 200,
      ease: 'inOutSine'
    });
    return;
  }

  $container.classList.remove('warn');
  $textwarning.style.opacity = 0;
  onEnter();

})

const timeline = createTimeline ({
  autoplay: false,
  defaults: {
    duration: 400,
    ease: 'outBack(1.02)',
    
  },
  onComplete: self => onFinish()
  });

  timeline.add($textarea, {opacity: 0}, 0)
  .add($container, {width: 60, height: 60, padding: 20}, 0)
  .add($buffer, {opacity: 1}, 0);

function onEnter() {
  $textarea.disabled = true;

  timeline.play();

  animate($buffer, {
    rotate: [0, 360],
    duration: 1000,
    loop: true,
    ease: 'inOutSine'
  });
}

// const { logo_text_chars } = splitText($logotext, {chars: true});

//Finish animation test
function onFinish() {
  const introStart = createTimeline({
  })

  introStart.add($container, {
    opacity: 0,
    duration: 200,
    onComplete: self => $container.style.display = 'none'
  }, 0)
  .add(svg.createDrawable($osulogo.children), {
    draw: ['0 0', '0 1'],
    ease: 'inOutQuad',
    duration: 500,
    delay: stagger(100),
    loop: false,
    onBegin: self => $logocontainer.classList.remove('off')
  }, 200)
  .add($logotext, {
    height: [0, 30],
    duration: 500,
    ease: 'inOutCirc',
    onBegin: self => $logotext.style.display = 'block'
  })
  .add($logocontainer.querySelector('.comingsoon'), {opacity: 1, duration: 1000, delay: 300});


}
// setupCounter(document.querySelector('#counter'))
