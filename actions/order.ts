import { IOrderResponse } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const initialOrder: IOrderResponse = {
  id: 0,
  month: new Date().getMonth() + 1,
  plants: [],
};

const getOrdersWithPlantKeys = (order: IOrderResponse) => ({
  ...order,
  plants: order.plants.map((p) => ({ ...p, key: uuidv4() })),
});

export default {
  getLastOrder: async (): Promise<IOrderResponse> => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/user/1/last`
    );
    if (response.status === 200) {
      const order = (await response.json()) as IOrderResponse;
      return getOrdersWithPlantKeys(order);
    }

    return initialOrder;
  },

  saveOrder: async (order: IOrderResponse): Promise<IOrderResponse> => {
    if (order.id) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/user/1/order/${order.id}`,
        {
          method: 'PUT',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(order),
        }
      );
      const orderUpdated = (await response.json()) as IOrderResponse;
      return getOrdersWithPlantKeys(order);
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/user/1`,
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(order),
        }
      );
      const orderUpdated = (await response.json()) as IOrderResponse;
      return getOrdersWithPlantKeys(order);
    }
  },
};
