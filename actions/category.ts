import { ICategory } from '../types';

export default {
  getCategories: async (): Promise<ICategory[]> => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/category`);
    const categories = (await response.json()) as ICategory[];
    return categories;
  },
};
