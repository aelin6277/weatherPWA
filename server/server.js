const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const apiKey = '0a040cc8e256259379844e6e2bcaac96'; // Ersätt med din faktiska API-nyckel

// Serverar statiska filer från projektets rotmapp
app.use(express.static(path.join(__dirname, '..')));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servern körs på port ${PORT}`);
});
