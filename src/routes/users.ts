import * as express from 'express';
import { Router } from 'express';
import { login, addCustomer, getAllCustomer, getSingleCustomer, editCustomer, removeCustomer } from '../controllers/users';

const router: Router = express.Router();

router.post('/login', login);

router.get('/customers', getAllCustomer);

router.get('/customers/:id', getSingleCustomer);

router.post('/customers/create', addCustomer);

router.patch('/customers/:id', editCustomer);

router.delete('/customers/:id', removeCustomer);

export default router;
