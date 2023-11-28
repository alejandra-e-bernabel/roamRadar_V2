require('dotenv').config();
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// app.get('/location', (req, res) => {
//   const apiKey = process.env.API_KEY;

//   if (!apiKey) {
//       console.error('API key not found');
//       return res.status(500).send('Internal Server Error');
//   }

//   console.log('API Key:', apiKey);

//   const locationHtml = path.join(__dirname, '/public/location.html');
//   const apiKeyPlaceholder = 'API_KEY';
//   res.sendFile(locationHtml.replace(apiKeyPlaceholder, apiKey));
// });

// app.get('/restaurant', (req, res) => {
//     const locationHtml = path.join(__dirname, '/public/restaurant.html');
//     const apiKeyPlaceholder = 'API_KEY'
//     const apiKey = process.env.API_KEY
//     res.sendFile(locationHtml.replace(apiKeyPlaceholder, apiKey));
// })

// app.get('/thingsToDo', (req, res) => {
//     const locationHtml = path.join(__dirname, '/public/thingsToDo.html');
//     const apiKeyPlaceholder = 'API_KEY'
//     const apiKey = process.env.API_KEY
//     res.sendFile(locationHtml.replace(apiKeyPlaceholder, apiKey));
// })

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);