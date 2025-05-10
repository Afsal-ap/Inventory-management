import axios from './http';
import { ICustomer } from '../types/customer';

export const fetchCustomers = async (token: string): Promise<ICustomer[]> => {
  const response = await axios.get('/customers', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
