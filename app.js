const apiKey = '3c73acdc0f41c548c2a6b2bf65f0fa97'; // Ersätt detta med din API-nyckel

document.getElementById('get-weather-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = `Temperature in ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
        document.getElementById('weather-info').innerText = weatherInfo;
      })
      .catch(() => {
        document.getElementById('weather-info').innerText = 'City not found';
      });
  }
  
});
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('Service Worker Registered');
    });
  }
  