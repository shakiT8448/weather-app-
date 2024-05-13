function getWeather(){
    const apikey = `76c57501d48cccffa06d3271e425bf16` ;
    const city = document.getElementById('city').value;

    if(!city){
        alert('لطفا یک شهر را وارد کنید');
        return;
    }
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch(currentWeatherUrl)
         .then(response => response.json())
         .then(data=> {
             displayWeather(data);
         })
         .catch(error=> {
            console.error('error fetching current weather data:' , error);
            alert('گرفتن اطلاعات هوا با مشکل مواج شد. لطفا دوباره تلاش کنید.');
         });
        
    fetch(forecastUrl)
         .then(response=> response.json())
         .then(data=>{
             displayHourlyForecast(data.list);
         })
         .catch(error=> {
         console.error('error fetching hourly forecast data:' , error);
             alert('گرفتن اطلاعات هوا با مشکل مواج شد. لطفا دوباره تلاش کنید.');
         });
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
}

function displayWeather(data){
    if(data.cod === '404'){
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
}
    else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;

        const weatherHTML = `
        <p> ${cityName} </p>
         <p>${description}</p>
         `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);
    
    next24Hours.forEach(item=>
        {
          const dateTime = new Date(item.dt * 1000);
          const hour = dateTime.getHours();
          const temperature = Math.round(item.main.temp - 273.15);
          const iconCode = item.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

          const hourlyItemHtml = `
          <div class="hourly-item"> 
          <span>${hour}:00</span>
           <img src="${iconUrl}" alt="آیکن ساعتی هوا"> 
           <span>${temperature}°C</span> 
          </div>
          `;
          hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
}

function showimage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}