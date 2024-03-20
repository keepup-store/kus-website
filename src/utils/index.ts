import axios from 'axios';

type TelegramMessageType = 'alert' | 'bug' | 'registration' | 'kus_stats' | 'logs';

export const sendMessageToTelegram = (type: TelegramMessageType, message: string): void => {
  let chatID: string;
  message = encodeURIComponent(message);
  switch (type) {
    case 'bug':
      chatID = '-424645018';
      break;
    case 'registration':
      chatID = '-402509811';
      break;
    case 'kus_stats':
      chatID = '-437417153';
      break;
    case 'logs':
      chatID = '-452088794';
      break;
    default:
      chatID = '-470792640';
      break;
  }

  axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_API_KEY}/sendMessage?chat_id=${chatID}&text=${message}`)
  .then(() => {
    console.log("Telegram message sent");
  })
  .catch((err) => {
    console.log("Error sending telegram message");
    console.dir(err);
  });
}