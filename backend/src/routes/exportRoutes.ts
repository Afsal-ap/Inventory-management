import { Router } from 'express';
import { exportSalesExcel, exportSalesPDF, emailSalesReport } from '../controllers/exportController';

const router = Router();

router.get('/sales/excel', exportSalesExcel);
router.get('/sales/pdf', exportSalesPDF);
router.post('/sales/email', emailSalesReport);

export default router;
