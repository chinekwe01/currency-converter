const axios = require('axios');

// 1st function - getExchangeRate
const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=c5214a8f782ec8fbfde4ed01f4f36a32&format=1');

    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    return exchangeRate;
    }

getExchangeRate('USD', 'EUR')