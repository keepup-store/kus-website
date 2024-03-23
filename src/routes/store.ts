import express, { Request, Response } from 'express';
import { extractStoreDomain, getLocation, getStoreAxiosHeaders } from '../utils';
import { baseURLs, subscriptionPackages } from '../utils/constants';
import axios from 'axios';

const router = express.Router();

router.get('/products', async (req: Request, res: Response) => {
  let host = extractStoreDomain(req);
  const ipAddress = req.clientIp;

  console.log(host);
  host = 'glampack';

  let { 
		product, 
		category,
		page,
	} = req.query;

  product = typeof product === 'string' ? product : '';
  category = typeof category === 'string' ? category : '';
  page = typeof page === 'string' ? page : '';

  let currentPage: number = page ? parseInt(page) : 1;

  // if host is keepup.store go to 404 page
  // if(!host || host === 'localhost:7000'){
  //   return res.redirect('/404');
  // } 

  // get products
  axios.get(baseURLs.API_URL + "/online-store/products", {
    params: {
      limit: 12,
      product_name: product,
      category,
      page: currentPage
    },
    headers: getStoreAxiosHeaders(host).headers
  })
  .then((response) => {
      let responseInfo = response.data;
      let totalProducts = responseInfo.data.meta.total_records;
      let products = responseInfo.data.products;
      let categories = responseInfo.data.categories;

      let itemsPerPage = 12;
      let totalPages = Math.ceil(totalProducts / itemsPerPage);
      const start = (currentPage - 1) * itemsPerPage + 1;
      const end = Math.min(currentPage * itemsPerPage, totalProducts);

      let delta = 3,
      left = currentPage - delta,
      right = currentPage + delta + 1,
      pages = [];

      pages = Array.from({ length: totalPages }, (v, k) => k + 1)
      .filter((i) => i && i >= left && i < right);
    
      return res.render('storefront/partials/product-list', { 
        meta: {
          total_result: totalProducts,
          start,
          end
        },
        products,
        categories,
        pages,
        filter: {
          product,
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