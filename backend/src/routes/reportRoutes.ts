import { Router } from 'express';
import { getSalesReport, getItemReport, getCustomerLedger, exportItemReportExcel, exportItemReportPDF} from '../controllers/reportController';

const router = Router();

router.get('/sales', getSalesReport);
router.get('/items', getItemReport); 
router.get('/customer-ledger/:customerId', getCustomerLedger);
router.get('/item-report/excel', exportItemReportExcel);
router.get('/item-report/pdf', exportItemReportPDF);

export default router;
