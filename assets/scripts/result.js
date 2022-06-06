const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());

let uberDest = document.querySelector('#dest-uber');
let uberPrice = document.querySelector('#price-uber');
let lyftDest = document.querySelector('#dest-lyft');
let lyftPrice = document.querySelector('#price-lyft');

uberDest.textContent = params.destination;
lyftDest.textContent = params.destination;

uberPrice.textContent = params.uberPrice;
lyftPrice.textContent = params.lyftPrice;