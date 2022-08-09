export interface IPlant {
  id: string;
  name: string;
  imageId: string;
  key?: string;
}

export interface ICategory {
  id: string;
  name: string;
  plants: IPlant[];
}

export interface IOrder {
  date: Date;
  id: number;
  plants: IPlant[];
}

export interface IOrderResponse {
  month: number;
  id: number;
  plants: IPlant[];
}
