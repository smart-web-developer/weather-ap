const apiKey = "eccd313f18b8e7f3707548c869e1b0c6";
const weather = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});
async function getWeatherData(cityValue) {
    try { 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error("Network response was not ok");  
        }
        const data = await response.json()
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon

        const details = [
            `Feels like : ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity}%`,
            `Wind Speed : ${data.wind.speed} m/s`
        ]
       weather.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`
       weather.querySelector(".temperature").textContent = ` ${temperature}°C`

       weather.querySelector(".description").textContent = description;

       weather.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`)
       .join("");
    } catch (error) {
        weather.querySelector(".icon").innerHTML="";
        weather.querySelector(".temperature").textContent = "";
 
        weather.querySelector(".description").textContent = "An Error happend, Please write the correct name";
 
        weather.querySelector(".details").innerHTML = "";

    }
}

