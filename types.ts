export interface IPlant {
  id: string;
  name: string;
  imageId: string;
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
  date: string;
  id: number;
  plants: IPlant[];
}
