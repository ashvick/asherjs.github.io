var menuElem = document.getElementById('social-button');
var socialIcons = document.getElementsByClassName('navbar__social');

menuElem.onclick = function() {
    socialIcons[0].classList.toggle('open');
};

window.opener = null;
