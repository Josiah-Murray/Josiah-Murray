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
};

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
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action(){
  await getFoxPhoto();
  await generateReadMe();
}

action();