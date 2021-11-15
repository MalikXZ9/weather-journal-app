/* Global Variables */
const generateBtn = document.querySelector('#generate');
const dataSec = document.querySelector('.data-section');
const zipCodeEl = document.querySelector('.code');
const feelingEl = document.querySelector('#feeling');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
/*api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}*/
//API URL
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const apiKey = 'af96d9200a309db2fc8f4eb18d7005dd';

//absUrl
const absURL = 'http://127.0.0.1:8080';
let feeling;

//functions

const getData = async code => {
  try {
    const res = await fetch(`${baseURL}${code},&appid=${apiKey}&units=metric`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url = '', info = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info),
  });

  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const updateUI = async () => {
  const res = await fetch(`${absURL}/all`);
  try {
    const data = await res.json();
    const html = `<div class="data-container">
    <div class="city-container">
      <h1 class="city">${data.city}</h1>
      <h2 class="date">${data.newDate}</h2>
    </div>

    <div class="temp-container">
      <h1 class="temp">${data.temp} C</h1>
      <h1 class="rain">${data.description}</h1>
    </div>
  </div>
  <p class="feel-res">you're feeling: ${data.feeling}</p>`;

    dataSec.innerHTML = html;
  } catch (err) {
    console.log(err);
  }
};

const generate = () => {
  //ZIP CODE and Feeling input values
  const zipCode = zipCodeEl.value;
  feeling = feelingEl.value;

  getData(zipCode).then(data => {
    const {
      main: { temp },
      name: city,
      weather: [{ description }],
    } = data;

    const info = {
      newDate,
      city,
      temp,
      description,
      feeling,
    };

    postData(`${absURL}/add`, info);

    updateUI(data);

    dataSec.style.display = 'grid';
    //Scroll data to view
    dataSec.scrollIntoView({ behavior: 'smooth' });
  });
};

//btn event listener
generateBtn.addEventListener('click', generate);
