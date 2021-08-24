import { api } from "./Services/api";
import fs from 'fs';
const file = './files/coins.json';

interface JSON {
  coins: string[];
}

class Coins {
  public coins_json: JSON;

  constructor() {
    const current_data = fs.readFileSync(file);
    this.coins_json = JSON.parse(current_data.toString());
  }

  async addCoin(new_coin: string) {
    this.coins_json.coins.push(new_coin);
    const saveCoinsJSON = JSON.stringify(this.coins_json);

    fs.writeFileSync(file, saveCoinsJSON);
  }

  async getCoins(): Promise<Array<Object>> {
    try {
        const ret = await api.get(`/quotes/latest?symbol=${this.coins_json.coins.join(',')}`);
        var coins = [];
        this.coins_json.coins.map(coin => coins.push({ name: coin, value: ret.data.data[coin].quote.USD.price }));

        return coins;
    } catch (err) {
        console.log(err);
    }
  }
}

export {Coins}