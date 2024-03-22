export const baseURLs = {
  KUS_URL:  process.env.API_MODE === 'production' ? 
    "https://keepup.store" : process.env.API_MODE === 'uat' ? 
    "https://uat.keepup.store" : "http://localhost:7000",
  CLIENT_APP_URL:  process.env.API_MODE === 'production' ? 
    "https://app.keepup.store" : process.env.API_MODE === 'uat' ? 
    "https://uat-app.keepup.store" : "http://localhost:3000",
  API_URL:  process.env.API_MODE === 'production' ? 
    "https://api.keepup.store/v2.0" : process.env.API_MODE === 'uat' ? 
    "https://uat-api.keepup.store/v2.0" : "http://localhost:5050/v2.0"
}

export const subscriptionPackages = {
  GHS: {
    start_up: 20,
    growth: 50,
    expansion: 100,
  },
  USD: {
    start_up: 40,
    growth: 80,
    expansion: 200
  }   
}