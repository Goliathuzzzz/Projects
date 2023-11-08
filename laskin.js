'use strict';


function factorialize(num) {
  // factorializes a number
  let total = 1;
  for (let i = 1; i <= num; i++) {
    total *= i;
  }
  return total;
}

function droprate(num) {
  return (1 - 1/Math.E) ** (num * Math.E);
}

const suminput = prompt('Mitä lukua haluat tarkkailla (2-12):');
const amount = 2
const sum = parseInt(suminput)
let dicesum = 0;
let hits = 0;
const attempts = 1000000;

// probability of getting your number from 2 dice rolled once

for (let j = 0; j < attempts; j++) {
  dicesum = 0;
  for (let i = 0; i < amount; i++) {
    let roll = Math.floor(Math.random() * 6 + 1);
    dicesum += roll;
  }
  if (dicesum === sum) {
    hits += 1;
  }
}

const probability = (hits / attempts);
const tulos = 100 * probability.toFixed(6) + '%';

// probability to get number x times in y rolls of 2 dice

const xinput = prompt('Montako kertaa luku tuli: ');
const yinput = prompt('Montako kertaa noppia heitettiin: ');
const x = parseInt(xinput);
const y = parseInt(yinput);

const probability2 =
    (factorialize(y)/(factorialize(x) * factorialize(y - x)))
    * (probability ** x) * ((1-probability) ** (y-x));

const tulos2 = 100 * probability2.toFixed(6) + '%';

document.querySelector('#todnak').innerHTML =
    tulos;

if (probability2 >= droprate(1)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Näin kuului tapahtua.';
}
else if (droprate(1) > probability2 && probability2 >= droprate(2)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Ei tällaisesta voi valittaa. Valintojen syytä.';
}
else if (droprate(2) > probability2 && probability2 >= droprate(3)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Epätodennäköisempää, kuin että Vesa valittaisi jostain.';
}
else if (droprate(3) > probability2 && probability2 >= droprate(4)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Ihan semi unlucky/lucky.';
}
else if (droprate(4) > probability2 && probability2 >= droprate(5)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Näistä tahtoo lähteä himaan / Et voittanut taitojesi takia';
}
else if (droprate(5) > probability2 && probability2 >= droprate(6)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Niin epätodennäköistä, että mitään suorituksestasi ei voi mitata';
}
else {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Muut tarjoaa sinulle kaljat / Tarjoa muille kaljat';
}