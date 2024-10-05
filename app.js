document.getElementById('get-weather-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
    fetch(`/weather?city=${encodeURIComponent(city)}`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          const weatherInfo = `Temperatur i ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
          document.getElementById('weather-info').innerText = weatherInfo;
        } else {
          document.getElementById('weather-info').innerText = 'Staden kunde inte hittas';
        }
      })
      .catch((error) => {
        console.error('Fel vid hämtning av väderdata:', error);
        document.getElementById('weather-info').innerText = 'Ett fel uppstod vid hämtning av väderdata';
      });
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker registrerad');
  });
}
