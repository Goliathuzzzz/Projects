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
let inspectionperiod = [];

for (let i = 0; i < games; i++) {
  for (let j = 0; j < gamelength; j++) {
    let roll = Math.random();
    if (roll <= probability) {
      inspectionperiod.push(hit);
    }
    else {
      inspectionperiod.push(miss);
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
  }
}