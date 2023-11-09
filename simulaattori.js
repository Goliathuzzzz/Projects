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
let happened = 0;
let mostrolls = 0;
let totalrolls = 0;
let maxhitsinrow = 0;
let totalmaxhitsinrow = 0;

for (let i = 0; i < games; i++) {
  let rolls = 0
  let inspectionperiod = [];
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
const average = totalrolls / (gamelength * games)
const happenedprobability = happened / games;
document.querySelector()