// Ladda miljövariabler från .env-filen
require('dotenv').config();

// Importera nödvändiga moduler
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

// Skapa en Express-app
const app = express();

// Hämta API-nyckeln från miljövariablerna
const apiKey = process.env.OPENWEATHER_API_KEY;

// Logga API-nyckeln för felsökning
console.log('Använd API-nyckel:', apiKey);

// Middleware för att servera statiska filer
app.use(express.static(path.join(__dirname, '..')));

// Route för att hämta väderdata
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=sv`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Data från API:', data);
    res.json(data);
  } catch (error) {
    console.error('Fel vid hämtning av data från API:', error);
    res.status(500).json({ error: 'Serverfel' });
  }
});

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servern körs på port ${PORT}`);
});
