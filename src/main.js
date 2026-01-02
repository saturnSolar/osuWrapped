import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {animate, spring, createTimeline, svg} from 'animejs'

//Container containing the textarea and buffer
const $container = document.querySelector('.container');
const $textarea = $container.getElementsByClassName('text')[0];
const $buffer = $container.querySelector('.loader-container');
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
$textarea.addEventListener('focus', () => anim.play());
$textarea.addEventListener('blur', () => anim.reverse());

$textarea.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  onEnter();

})


function onEnter() {
  const timeline = createTimeline ({
    defaults: {
      duration: 400,
      ease: 'outBack(1.02)'
    }
  });

  timeline.add($textarea, {opacity: 0}, 0)
  .add($container, {width: 60, height: 60, padding: 20}, 0)
  .add($buffer, {opacity: 1}, 0);

  animate($buffer, {
    rotate: [0, 360],
    duration: 1000,
    loop: true,
    ease: 'inOutSine'
  });
}
// setupCounter(document.querySelector('#counter'))
