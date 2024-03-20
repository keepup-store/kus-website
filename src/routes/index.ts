import express from 'express';
import landingPageRoutes from './landing-page';

const router = express.Router();


// Use the resource routers
// router.use('/v', businessRoutes);
// router.use('/home', salesRoutes);
// router.use('/orders', ordersRoutes);
// router.use('/print', teamsRoutes);
// router.use('/order-label', statisticsRoutes);
// router.use('/terms-and-conditions', reportsRoutes);
// router.use('/privacy-policy', customersRoutes);
// router.use('/cookie-policy', paymentsRoutes);
// router.use('/about', inventoryRoutes);
// router.use('/release-notes', servicesRoutes);
router.use('/', landingPageRoutes);

export default router;