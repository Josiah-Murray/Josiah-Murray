// index.js
const Mustache = require('mustache');
const fetch = require('node-fetch')
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/


const response = await fetch('https://randomfox.ca/floof');
const data = await response.json();




let DATA = {
  name: 'Josiah',
  date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Stockholm',
  }),
  myImg: data["image"],
};
<<<<<<< Updated upstream
/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
=======

async function getFoxPhoto(){

  const url = 'https://randomfox.ca/floof/';

  const options = {
    method: 'POST',
  };

  await fetch(url, options)
    .then(res => res.json())
    .then(json => DATA.myImg = json["image"])
    
    .catch(err => console.error('error:' + err));
    
    
}


async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
>>>>>>> Stashed changes
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}
generateReadMe();