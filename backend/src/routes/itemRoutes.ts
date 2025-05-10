import express from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems
} from '../controllers/itemController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect); 

router.get('/', getItems);
router.get('/search', searchItems);
router.get('/:id', getItemById);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
