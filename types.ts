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
