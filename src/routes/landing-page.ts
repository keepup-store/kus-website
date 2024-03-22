import express, { Request, Response } from 'express';
import { extractStoreDomain, getLocation } from '../utils';
import { baseURLs, subscriptionPackages } from '../utils/constants';

const router = express.Router();

const subsidizedCountries = ['GH', 'NG', 'TG', 'KE']

router.get('/', async (req: Request, res: Response) => {
  let host = extractStoreDomain(req);
  const ipAddress = req.clientIp;

  console.log({ipAddress});

  // if host is keepup.store go to home page
  // if(!host || host === 'localhost:7000'){
  //   let plans = subscriptionPackages;

  //   if(ipAddress) {
  //     let location = await getLocation(ipAddress);
  //     return res.render('website/index', { 
  //       plans: subsidizedCountries.includes(location.countryCode) ? plans.GHS : plans.USD,
  //       urls: baseURLs
  //     });        
  //   }    
  // } 

  return res.render('storefront/index', { 
    urls: baseURLs,
    store_info: {
      business_name: 'Awesome Juice',
      logo: '',
      phone_number: '+233201234567',
      email: 'juice@mail.com',
      location: 'Adenta, Ghana',
      description: 'Download this Premium Vector about Drink cup packaging soft drink logo template, and discover more than 150 Million Professional Graphic Resources on Freepik',
      banners: {
        landscape: '',
        portrait: ''
      },
      socials: {
        twitter: '',
        linkedIn: '',
        facebook: '',
        whatsapp: '',
        tiktok: '',
        youtube: '',
        snapchat: '',
      },
      terms: '',
    }
  });

});


export default router;