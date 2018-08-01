import './index.js';
import '../css/animate.css';
import '../css/index.css';
import {A ,A_init} from './A.js'

window.onload = function () {
    let a_init = new A_init("animated");
    document.onscroll = function () {
        a_init.perform();
    }
}


