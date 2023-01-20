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
  // console.log("Here?")
  // await fetch("https://randomfox.ca/floof", {
  //   method: 'POST',
  //   params: {cat: 'movies', count: '10'},
  //   headers: {
  //     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
  //     'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
  //   }})
  // //.then(r => r.json())
  // .then(r => {
  //   DATA.myImg = r.image
  // });
  // //DATA.myImg = await response.json()["image"];

  const url = 'https://randomfox.ca/floof/';

  const options = {
    method: 'POST',
  };

  await fetch(url, options)
    .then(res => res.json())
    .then(json => DATA.myImg = json["image"])
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
    console.log(DATA.myImg)
    
}

/*
async function setWeatherInformation() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`
  )
    .then(r => r.json())
    .then(r => {
      DATA.city_temperature = Math.round(r.main.temp);
      DATA.city_weather = r.weather[0].description;
      DATA.city_weather_icon = r.weather[0].icon;
      DATA.sun_rise = new Date(r.sys.sunrise * 1000).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm',
      });
      DATA.sun_set = new Date(r.sys.sunset * 1000).toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Stockholm',
      });
    });
}
*/

/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action(){
  await getFoxPhoto();
  console.log(DATA.myImg);
  await generateReadMe();
}

action();