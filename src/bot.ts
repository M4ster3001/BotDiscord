import {Client, Intents, TextChannel} from 'discord.js' //import discord.js
import { Messages } from './Messages';
import {CronJob} from 'cron';
import { Coins } from './Coins';

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] }); //create new client

const day = parseInt(process.env.TOTAL_REQUESTS_DAY);
const hour = day/24;
const minute = hour/60;
const time_to_request = Math.ceil(1/minute);

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('', { type: 'PLAYING' });

  console.log(`Tempo entre os requets: ${time_to_request} minutos`);
  const next_request = new Date().getTime() + (time_to_request * 60 * 1000);
  console.log(`Próximo: ${new Date(next_request).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);

  await Messages.sendMessage(client, time_to_request);
  
  let scheduledMessage = new CronJob(`*/${time_to_request} * * * *`, async () => {
    let next_request_seconds = new Date().getTime() + (time_to_request * 60 * 1000);
    let next_request = new Date(next_request_seconds).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    let current_date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    console.log(`Enviando mensagem às ${current_date}, próximo: ${next_request}`);

    await Messages.sendMessage(client, time_to_request);
  }, null, true, 'America/Sao_Paulo');

  scheduledMessage.start();

});

client.on("messageCreate", async message => {
  if(message.system) return;
  if(message.author.bot) return;
  if (!message.guild) return;
  
  if(message.content.startsWith('!add')) {
    const coin = new Coins();
    const new_coin = message.content.replace('!add', '').replace('/^[a-zA-Z\s]*$/', '').trim();

    coin.addCoin(new_coin);

    console.log(`Moeda adicionada: ${new_coin}`);
  }
});

//make sure this line is the last line
client.login(process.env.BOT_TOKEN); //login bot using token
