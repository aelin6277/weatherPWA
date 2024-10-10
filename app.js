// Registrera service workern
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrerad med scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registrering misslyckades:', error);
      });
  });
}


// Funktion för att uppdatera nätverksstatus
function updateOnlineStatus() {
  const statusElement = document.getElementById('network-status');
  if (navigator.onLine) {
    statusElement.innerText = 'Du är online';
    statusElement.classList.remove('offline');
    statusElement.classList.add('online');
  } else {
    statusElement.innerText = 'Du är offline';
    statusElement.classList.remove('online');
    statusElement.classList.add('offline');
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Anropa funktionen vid start
updateOnlineStatus();

document.getElementById('get-weather-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city) {
    if (!navigator.onLine) {
      // Offline-läge: hämta cachad data om tillgänglig
      const cachedData = localStorage.getItem(`weatherData-${city.toLowerCase()}`);
      if (cachedData) {
        const data = JSON.parse(cachedData);
        const weatherInfo = `Temperatur i ${data.name}: ${data.main.temp}°C, ${data.weather[0].description} (cachad data)`;
        document.getElementById('weather-info').innerText = weatherInfo;
      } else {
        document.getElementById('weather-info').innerText = 'Ingen internetanslutning och ingen tidigare data tillgänglig för denna stad.';
      }
    } else {
      // Online-läge: gör API-anropet som vanligt
      fetch(`/weather?city=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
          if (data.cod === 200) {
            const weatherInfo = `Temperatur i ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
            document.getElementById('weather-info').innerText = weatherInfo;

            // Spara data lokalt
            localStorage.setItem(`weatherData-${city.toLowerCase()}`, JSON.stringify(data));
          } else {
            document.getElementById('weather-info').innerText = 'Staden kunde inte hittas';
          }
        })
        .catch((error) => {
          console.error('Fel vid hämtning av väderdata:', error);
          document.getElementById('weather-info').innerText = 'Ett fel uppstod vid hämtning av väderdata';
        });
    }
  } else {
    document.getElementById('weather-info').innerText = 'Vänligen ange ett stadsnamn.';
  }
});
