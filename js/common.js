"use strict";

import {startLife} from './libs/life.js';

document.addEventListener("DOMContentLoaded", function() {

    let menuElem = document.getElementById('social-button');
    let social = document.getElementsByClassName('navbar__social');

    menuElem.onclick = function() {
        social[0].classList.toggle('open');
    };

    startLife();

    window.opener = null;

});

