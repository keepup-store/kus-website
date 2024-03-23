import jwt from 'jsonwebtoken';
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

export const extractStoreDomain = (req: any): string => {
  // Get the host from the request headers
  const host: string = req.headers.host;

  // Check if the host contains "keepup.store"
  if (host && host.includes("keepup.store")) {
      // Split the host by "." to extract the subdomain
      const parts: string[] = host.split(".");
      
      // Return the first part as the subdomain
      return parts.length > 2 ? parts[0] : '';
  } else {
      // If "keepup.store" is not part of the host, return the host domain
      return host;
  }
}

export const getLocation = async(ipAddress: string): Promise<{ country: string, countryCode: string }> => {
  try {
      // Make a request to an IP geolocation API to get the user's location
      const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);

      // Extract relevant location data from the API response
      const { country, countryCode } = response.data;

      // Return the location data
      return { country, countryCode };
  } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error getting location:', error);
      throw new Error('Failed to fetch location data');
  }
}

export const getStoreAxiosHeaders = (store: string) => {
  const access_token = { store };
  const jwtAccessToken = jwt.sign({access_token}, process.env.JWT_KEY ?? '', { expiresIn: '1d' });
  return { headers: {"Authorization" : `Bearer ${jwtAccessToken}`} }
}