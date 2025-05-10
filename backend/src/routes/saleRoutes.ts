import express from 'express';
import {
  createSale,
  getSales,
  getSaleById, // <- make sure to import this
} from '../controllers/saleController';
import { protect } from '../middlewares/authMiddleware';
const router = express.Router();

router.use(protect);


router.post('/', createSale);
router.get('/', getSales);
router.get('/:id', getSaleById); // <-- keep this last

export default router;
