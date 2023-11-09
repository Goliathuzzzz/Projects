'use strict';

function doc(id, string) {
  return document.querySelector('#' + id).innerHTML = string
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
doc('luku', 'Tarkkailtava luku on ' + suminput);
doc('noppa', 'Tarkkailtavan luvun todennäköisyys on noin: ' + 100 * probability.toFixed(6) +'#');

// simulates 100000 games of 'gamelength' length
// inspects an array of 'turns' length. If length exceeds 'turns', deletes first item of array
// if sum of items in array == 'times', the tested outcome has occured once
// Updates various other variables

const timesinput = prompt('Kuinka monta kertaa luku tuli:');
const times = parseInt(timesinput);
const turnsinput = prompt('Kuinka monen vuoron aikana luku tuli:');
const turns = parseInt(turnsinput);
const gamelengthinput = prompt('Kuinka monta vuoroa peli kesti (71 keskiarvo):');
const gamelength = parseInt(gamelengthinput);
const games = 100000;
const hit = 1;
const miss = 0;
let inspectionperiod = [];
let happened = 0;
let mostrolls = 0;
let totalrolls = 0;
let maxhitsinrow = 0;
let totalmaxhitsinrow = 0;

for (let i = 0; i < games; i++) {
  let rolls = 0;
  inspectionperiod.length = 0;
  let currenthitsinrow = 0;
  for (let j = 0; j < gamelength; j++) {
    let roll = Math.random();
    if (roll <= probability) {
      rolls += hit;
      inspectionperiod.push(hit);
      currenthitsinrow += 1;
    }
    else {
      inspectionperiod.push(miss);
      currenthitsinrow = 0;
    }
    if (inspectionperiod.length > turns) {
      inspectionperiod.shift();
    }
    if (inspectionperiod.length <= turns) {
      let total = 0;
      for (let item in inspectionperiod) {
        total += item;
      }
      if (total >= times) {
        happened += 1;
        inspectionperiod.length = 0;
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
  totalrolls += rolls
}
const average = totalrolls / games;
const happenedprobability = happened / games;
const maxhitsinrowprob = totalmaxhitsinrow / games;
doc('pelimaara', gamelength + ' pituinen peli simuloitiin ' + games + ' kertaa.');
doc('esiintymat', 'Luku esiintyi' + gamelength +
    ' pituisessa pelissä' + totalrolls + 'kertaa');
doc('maxesiintymat', 'Luku esiintyi enimmillään ' + mostrolls + ' kertaa pelissä.');
doc('esiintymienkeskiarvo', 'Luku esiintyi keskimäärin ' + average + ' kertaa pelissä.');
doc('jaksonesiintymat', times + 'lukua esiintyi ainakin ' + happened + ' kertaa enintään ' + turns +
    ' mittaisessa jaksossa nopanheittoja.');
doc('jaksontodnak', 'Todennäköisyys, että ainakin ' + times + ' lukua esiintyy enintään ' +
    turns + ' mittaisessa jaksossa: ' + 100 * happenedprobability.toFixed(6) + '%');
doc('pisinjakso', 'Pisin jono lukuja peräkkäin: ' + maxhitsinrow);
doc('pisinesiintymat', 'Näin kävi ' + totalmaxhitsinrow + ' kertaa.');
doc('pisintodnak', 'Todennäköisyys, että luku tulee ' + maxhitsinrow + 'kertaa peräkkäin, ' +
    'on noin: ' + 100 * maxhitsinrowprob.toFixed(6) + '%');