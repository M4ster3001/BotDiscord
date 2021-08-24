import { Channel, Client, TextChannel } from 'discord.js';
import { Coins } from './Coins';

interface CoinsDTO {
  name: string;
  value: number;
}

class Messages {
  static async clearOldMessages(channel: Channel) {
  }

  static async sendMessage(client: Client, time_to_request: number){
    const coin = new Coins();
    const messages = [];

    const prices = await coin.getCoins();
    prices.map((data: CoinsDTO, index, _) => messages.push(`Valor do ${data.name}: $${data.value.toFixed(2)}`));

    client.guilds.cache.map(guild => {
      guild.channels.cache.map(async channel => {
        if(channel && channel.type == 'GUILD_TEXT'){
          // this.clearOldMessages(messages);

          const textChannel: TextChannel = channel as TextChannel;
          textChannel.send(messages.join("\n")).then(message => {
            setTimeout(() => {
              message.delete();
            }, time_to_request * 60 * 1000);
          });
        }
      });
    });
  }
}

export {Messages}

