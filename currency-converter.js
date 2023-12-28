const axios = require('axios');

// 1st function - getExchangeRate
const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=c5214a8f782ec8fbfde4ed01f4f36a32&format=1');
    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    if(isNaN(exchangeRate)){
        throw new Error (`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }
    return exchangeRate;
    }

// 2nd function - getCountries
const getCountries = async (toCurrency) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${toCurrency}`)
        return response.data.map(country => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that uses ${toCurrency}`);
    }
}

// 3rd function - convertCurrency
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const countries = await getCountries(toCurrency);
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

// Call convert currency to get meaningful data.
convertCurrency('USD', '2UD', 30)
    .then((message) => {
        console.log(message);
    }).catch((error) => {
        console.log(error.message);
    })