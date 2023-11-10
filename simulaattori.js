'use strict';

function doc(id, string) {
  return document.querySelector('#' + id).innerHTML = string
}

function factorialize(num) {
  // factorializes a number
  let total = 1;
  for (let i = 1; i <= num; i++) {
    total *= i;
  }
  return total;
}

const suminput = prompt('Mitä lukua haluat tarkkailla (2-12):');
const amount = 2
const sum = parseInt(suminput)
let dicesum = 0;
let hits = 0;
const attempts = 1000000;

// probability of getting your number from 2 dice rolled once

if (sum >= 2 && sum <= 12) {
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
}
else {
  alert('Ei kelvollinen luku. Päivitä sivu.');
}

const probability = (hits / attempts);
doc('luku', 'Tarkkailtava luku on ' + suminput);
doc('noppa', 'Tarkkailtavan luvun todennäköisyys on noin: ' + 100 * probability.toFixed(6) +'%');

// simulates 'games' amount games of 'gamelength' length
// inspects an array of 'turns' length. If length exceeds 'turns', deletes first item of array
// behaves slightly differently, if 'times' == 0
// if sum of items in array == 'times', the tested outcome has occured once
// Updates various other variables

const timesinput = prompt('Kuinka monta kertaa luku tuli jaksossa/putkeen:');
const times = parseInt(timesinput);
const turnsinput = prompt('Kuinka pitkää jaksoa (vuoroja) haluat tarkkailla:');
const turns = parseInt(turnsinput);
const gamelengthinput = prompt('Kuinka monta vuoroa peli kesti (71 keskiarvo):');
const gamesinput = prompt('Kuinka monta peliä haluat simuloida (max 100000):');
const gamelength = parseInt(gamelengthinput);
const games = parseInt(gamesinput);
let total = 0;
let maxlwtotal = 0;
let inspectionperiod = [];
let maxlengthwithoutinspection = [];
let happened = 0;
let mostrolls = 0;
let totalrolls = 0;
let maxhitsinrow = 0;
let totalmaxhitsinrow = 0;
let maxlengthwithout = 0;
let maxlengthwithoutamounts = 0;

if (games <= 100000 && times <= turns) {
  for (let i = 0; i < games; i++) {
  let rolls = 0;
  inspectionperiod = [];
  let currenthitsinrow = 0;
  maxlengthwithoutinspection = [];
  for (let j = 0; j < gamelength; j++) {
    let roll = Math.random();
    if (roll <= probability) {
      rolls += 1;
      inspectionperiod.push(1);
      maxlengthwithoutinspection.push(1);
      currenthitsinrow += 1;
    }
    else {
      inspectionperiod.push(0);
      maxlengthwithoutinspection.push(0);
      currenthitsinrow = 0;
    }
    for (let i = 0; i < inspectionperiod.length; i++) {
      total += inspectionperiod[i];
    }
    for (let i = 0; i < maxlengthwithoutinspection.length; i++) {
      maxlwtotal += maxlengthwithoutinspection[i];
    }
    if (maxlwtotal === 0) {
      if (maxlengthwithout < maxlengthwithoutinspection.length) {
        maxlengthwithout = maxlengthwithoutinspection.length;
        maxlengthwithoutamounts = 0;
      }
      if (maxlengthwithout === maxlengthwithoutinspection.length) {
        maxlengthwithoutamounts += 1;
      }
    }
    if (maxlwtotal > 0) {
      while (maxlwtotal > 0) {
          maxlwtotal -= maxlengthwithoutinspection[0];
          maxlengthwithoutinspection.shift();
        }
    }
    if (times >= 1) {
      if (inspectionperiod.length > turns) {
      inspectionperiod.shift();
      }
      if (total >= times) {
        happened += 1;
        inspectionperiod = [];
      }
      total = 0;
    }
    else {
      if (total > 0) {
        while (total > 0) {
          total -= inspectionperiod[0];
          inspectionperiod.shift();
        }
      }
      if (inspectionperiod.length === turns) {
        happened += 1;
      }
    }
    if (currenthitsinrow === maxhitsinrow) {
      totalmaxhitsinrow += 1;
    }
    if (currenthitsinrow > maxhitsinrow) {
      maxhitsinrow = currenthitsinrow;
      totalmaxhitsinrow = 1;
    }
  }
  if (rolls > mostrolls) {
    mostrolls = rolls;
  }
  totalrolls += rolls;
}
}
else {
  alert('Liian kuormittava simulaatio / Virheellinen syöte. Päivitä sivu.')
}

// Calculates probability of number appearing at least the most times it appearead during a game

const average = totalrolls / games;
let maxrollprob = 0;
for (let i = 0; i <= mostrolls; i++) {
  maxrollprob +=
    (factorialize(gamelength)/(factorialize(i) * factorialize(gamelength - i)))
    * (probability ** i) * ((1-probability) ** (gamelength-i));
}

// Calculates probability of number appearing more times than 'times' during a 'turns' long period

let turnsprob = 0;
for (let i = 0; i <= times; i++) {
  turnsprob +=
    (factorialize(turns)/(factorialize(i) * factorialize(turns - i)))
    * (probability ** i) * ((1-probability) ** (turns-i));
}
let realturnsprob = 1 - turnsprob;
let overmaxrollprob = 1 - maxrollprob;

// Calculates probability of number not appearing for 'maxlengthwithout' turns.

const maxlwprobability = 100 * ((1 - probability) ** maxlengthwithout).toFixed(12) + '%'

// html outputs

doc('pelimaara', gamelength + ' vuoroa pitkä peli simuloitiin ' + games + ' kertaa.');
doc('esiintymat', `"${sum}"` + ' esiintyi ' + gamelength +
    ' vuoroa pitkissä peleissä yhteensä ' + totalrolls + ' kertaa');
doc('maxesiintymat', `"${sum}"` + ' esiintyi enimmillään ' + mostrolls + ' kertaa pelissä. ' +
    'Todennäköisyys, että ' + `"${sum}"` + ' esiintyy ainakin ' + mostrolls + ' kertaa: ' + 100 * maxrollprob.toFixed(12) + '%' +
    ' tai useammin kuin ' + mostrolls + ' kertaa: ' + 100 * overmaxrollprob.toFixed(12) + '%');
doc('esiintymienkeskiarvo', `"${sum}"` + ' esiintyi keskimäärin ' + average.toFixed(4) + ' kertaa pelissä.');
doc('jaksonesiintymat', `"${sum}"` + ' -luku esiintyi ' + times + ' kertaa enintään ' + turns +
    ' mittaisessa jaksossa nopanheittoja: ' + happened + ' kertaa.');
doc('jaksontodnak', 'Todennäköisyys, että enemmän kuin ' + times + ' ' +`"${sum}"` + ' -lukua esiintyy ' +
    turns + ' mittaisessa jaksossa: ' + 100 * realturnsprob.toFixed(12) + '%');
doc('pisinjakso', 'Pisin jono ' + `"${sum}"` +':ja peräkkäin: ' + maxhitsinrow);
doc('pisinilman', 'Pisin jakso ilman lukua ' + `"${sum}"` + ' oli: ' + maxlengthwithout)
doc('pisinesiintymat', 'Näin kävi ' + totalmaxhitsinrow + ' kertaa.');
doc('pisinilmanesiintymat', 'Näin kävi ' + maxlengthwithoutamounts + ' kertaa.')
doc('pisintodnak', 'Todennäköisyys, että '+ `"${sum}"` +' tulee ' + maxhitsinrow + ' kertaa peräkkäin, ' +
    'on noin: ' + 100 * (probability ** (maxhitsinrow)).toFixed(12) + '%');
doc('pisinilmantodnak', 'Todennäköisyys, että ' + `"${sum}"` + ' tulee 0 kertaa ' + maxlengthwithout +
    ' vuoron aikana: ' + maxlwprobability);
