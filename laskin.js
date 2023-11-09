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
const tulos = 100 * probability.toFixed(4) + '%';

// probability to get number x times in y rolls of 2 dice

const xinput = prompt('Montako kertaa luku tuli: ');
const yinput = prompt('Montako kertaa noppia heitettiin: ');
const x = parseInt(xinput);
const y = parseInt(yinput);
let totalp = 0
for (let i = 0; i <= x; i++) {
  totalp +=
    (factorialize(y)/(factorialize(i) * factorialize(y - i)))
    * (probability ** i) * ((1-probability) ** (y-i));
}

// if total probability > 50%, take inverse probability

if (totalp > 0.5) {
  totalp = 1 - totalp;
}
const tulos2 = 100 * totalp.toFixed(4) + '%';

document.querySelector('#todnak').innerHTML =
    tulos;

if (totalp >= droprate(1)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Näin kuului tapahtua.';
}
else if (droprate(1) > totalp && totalp >= droprate(2)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Ei tällaisesta voi valittaa. Valintojen syytä.';
}
else if (droprate(2) > totalp && totalp >= droprate(3)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Ihan semi unlucky/lucky.';
}
else if (droprate(3) > totalp && totalp >= droprate(4)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Saat isot valitusoikeudet / Menetät valitusoikeutesi.';
}
else if (droprate(4) > totalp && totalp >= droprate(5)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Näistä tahtoo lähteä himaan. / Et onnistunut taitojesi takia.';
}
else if (droprate(5) > totalp && totalp >= droprate(6)) {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': https://findahelpline.com/fi/topics/suicidal-thoughts. / Olet niin onnekas, että joku antaa runtukepistä.';
}
else {
  document.querySelector('#tulos').innerHTML =
      tulos2 + ': Muut tarjoaa sinulle kaljat / Tarjoa muille kaljat.';
}