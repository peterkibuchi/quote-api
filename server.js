const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}...`);
});

app.get('/api/quotes', (req, res, next) => {
  if (req.query.person) {
    const person = req.query.person;
    const quotesByPerson = quotes.filter(quote => quote.person === person);

    res.json({
      quotes: quotesByPerson
    });
  } else {
    res.json({
      quotes: quotes
    });
  }
});

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.json({
    quote: randomQuote
  });
});

app.post('/api/quotes', (req, res, next) => {
  const { quote, person } = req.query;

  if (quote && person) {
    quotes.push({
      quote,
      person
    });

    res.json({
      quote: {
        quote,
        person
      }
    });
  } else {
    res.status(400).json();
  }
});