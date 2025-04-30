import axios from 'axios';

export const submitOrder = async (orderData: any) => {
  const res = await axios.post('/api/orders', orderData);
  return res.data;
};