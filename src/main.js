import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {animate, stagger} from 'animejs'

const $text = document.querySelector('.text');

animate($text,
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

let anim = animate($text,
  {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.43)',
    duration: 200,
    autoplay: false
  }
)

$text.addEventListener('focus', () => anim.play());

$text.addEventListener('blur', () => anim.reverse());

// setupCounter(document.querySelector('#counter'))
