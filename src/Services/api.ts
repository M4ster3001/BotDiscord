import axios from 'axios';

const api =  axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency',
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COIN_API,
  }
})

export {api}