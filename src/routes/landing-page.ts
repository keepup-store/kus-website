import express, { Request, Response } from 'express';
import { extractStoreDomain, getLocation, getStoreAxiosHeaders } from '../utils';
import { baseURLs, subscriptionPackages } from '../utils/constants';
import axios from 'axios';

const router = express.Router();

const subsidizedCountries = ['GH', 'NG', 'TG', 'KE']

router.get('/', async (req: Request, res: Response) => {
  let host = extractStoreDomain(req);
  const ipAddress = req.clientIp;

  console.log({host});
  // host = 'glampack';

  // if host is keepup.store go to home page
  if(!host || host === 'localhost:7000'){
    let plans = subscriptionPackages;

    if(ipAddress) {
      let location = await getLocation(ipAddress);
      return res.render('website/index', { 
        plans: subsidizedCountries.includes(location.countryCode) ? plans.GHS : plans.USD,
        urls: baseURLs
      });        
    }    
  } 

  let { 
		search, 
		category,
		page,
	} = req.query;

  search = typeof search === 'string' ? search : '';
  category = typeof category === 'string' ? category : '';
  page = typeof page === 'string' ? page : '';

  let currentPage: number = page ? parseInt(page) : 1;

  // get products
  axios.get(baseURLs.API_URL + "/online-store", {
    params: {
      limit: 12,
      product_name: search,
      category,
      page: currentPage
    },
    headers: getStoreAxiosHeaders(host).headers
  })
  .then((response) => {
      let responseInfo = response.data;
      let storeInfo = responseInfo.data;

      return res.render('storefront/index', { 
        business_name: storeInfo.business_name,
        logo: storeInfo.logo,
        header_logo: storeInfo.header_logo,
        brand_color: storeInfo.brand_color,
        phone_number: storeInfo.phone_number,
        email: storeInfo.email,
        location: storeInfo.address,
        description: storeInfo.description,
        landscape_banner: storeInfo.landscape_banner,
        portrait_banner: storeInfo.portrait_banner,
        socials: storeInfo.socials,
        terms: storeInfo.terms,
        filter: {
          search,
          category,
          page: currentPage
        }
      });

  }).catch((error) => {
    console.log({error});
    return res.redirect('/404');
  });


});

export default router;