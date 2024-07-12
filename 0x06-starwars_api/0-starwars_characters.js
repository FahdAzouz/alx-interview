#!/usr/bin/env node

const request = require('request');

const movieId = process.argv[2];
const filmEndPoint = `https://swapi-api.hbtn.io/api/films/${movieId}`;

const getCharacterName = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        reject(new Error(`Error: ${err} | StatusCode: ${res.statusCode}`));
      } else {
        const character = JSON.parse(body);
        resolve(character.name);
      }
    });
  });
};

const getCharacters = () => {
  request(filmEndPoint, async (err, res, body) => {
    if (err || res.statusCode !== 200) {
      console.error(`Error: ${err} | StatusCode: ${res.statusCode}`);
    } else {
      const film = JSON.parse(body);
      const characterUrls = film.characters;

      for (const url of characterUrls) {
        try {
          const name = await getCharacterName(url);
          console.log(name);
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  });
};

getCharacters();
