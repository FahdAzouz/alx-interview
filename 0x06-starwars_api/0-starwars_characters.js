#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
let people = [];
const films = [];
const filmEndPoint = 'https://swapi-api.hbtn.io/api/films/' + movieId;

const requestCharacters = async () => {
  await new Promise(resolve => request(filmEndPoint, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      console.error('Error: ', err, '| StatusCode: ', res.statusCode);
    } else {
      const jbody = JSON.parse(body);
      people = jbody.characters;
      resolve();
    }
  }));
};

const requestFilms = async () => {
  if (people > 0) {
    for (const p of people) {
      await new Promise(resolve => request(p, (err, res, body) => {
        if (err || res.statusCode !== 200) {
          console.error('Error: ', err, '| StatusCode: ', res.statusCode);
        } else {
          const jbody = JSON.parse(body);
          films.push(jbody.name);
          resolve();
        }
      }));
    }
  } else {
    console.error('Error : Got no characters to look up');
  }
};

const getCharNames = async () => {
  await requestCharacters;
  await requestFilms;

  for (const f of films) {
    if (f === films[films.length - 1]) {
      process.stdout.write(f);
    } else {
      process.stdout.write(f + '\n');
    }
  }
};

getCharNames();
