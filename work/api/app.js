/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const date_cont = document.querySelector('#date');
const temp_cont = document.querySelector('#temp');
const content_cont = document.querySelector('#content');
const right = document.querySelector('.right');
const img = document.querySelector('img');
const apiKey = '&appid=ea847be693b4e98166fd4ebe97d1887d&units=metric';
const getWeather = async (baseUrl,zipCode,apiKey)=>{
  const response = await fetch(baseUrl+zipCode+apiKey)
  try {
    const weather = response.json();
    return weather;
  }
  catch(error) {
    console.log(error);
  }
}
const getimg = async function(code){
  const res = await fetch('https://openweathermap.org/img/wn/'+code+'@2x.png')
  try { return res.url }
  catch(err) { console.log(err) }
}
function act(){
  img.style.display = 'none';
  date_cont.innerText = '';
  temp_cont.innerText = '';
  content_cont.innerText = '';
  zipCode = document.querySelector('#zip').value;
  date_cont.innerText = 'Loading...';
  getWeather(baseUrl,zipCode,apiKey)
    .then((result) => {
        if (result.cod != 200) {
            date_cont.innerText = 'Error '+result.cod+': '+result.message;
            return 0;
        }
        const weather = result.weather;
        getimg(weather[0].icon).then((response) => {
           img.src = response;
           img.style.display = 'block';
        })
        const main = result.main;
        let d = new Date();
        date_cont.innerHTML = d.toDateString()+'<br>'+d.toLocaleTimeString()+'<br>'+result.name+', '+result.sys.country;
        temp_cont.innerText = main.temp+'° C';
        content_cont.innerHTML = weather[0].description;
        right.appendChild(img);
    });
}
document.querySelector('#generate').addEventListener('click',act);
