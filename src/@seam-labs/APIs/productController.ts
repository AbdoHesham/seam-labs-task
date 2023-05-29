import { BaseURL } from '../config';
export const productController = {
  getAllCategories: BaseURL + `/products/categories`,
  getAllProducts: BaseURL + `/products`,
  getProductById: BaseURL + `/products`,

};
