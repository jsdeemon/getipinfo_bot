const dotenv = require('dotenv')
const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api');

dotenv.config() // configuring dotenv
const token = process.env.TELEGRAM_BOT_API_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// Matches "/ip
bot.onText(/\/ip (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const ip = match[1]; // ip 

 if (!ip) {
    bot.sendMessage(chatId, `Ip адрес указан неверно!`);
 } else {
    async function getDataFromIp(ip) {
        try {
          const response = await axios.get(`https://api.iplocation.net/?ip=${ip}`);
        //  console.log(response);
        if (!response.data.country_name) {
            bot.sendMessage(chatId, 'Произошла ошибка! Пожалуйства, проверьте правильность введенного IP')
        } else {
            bot.sendMessage(chatId, `IP: ${ip}\nСтрана: ${response.data.country_name}\nПровайдер: ${response.data.isp}\nСтатус: ${response.data.response_message}`);
        } 
        } catch (error) {
          console.error(error);
        }
      }
     
      getDataFromIp(ip);
 }
 
});