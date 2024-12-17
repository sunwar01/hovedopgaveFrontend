import {ProductModel} from '../productRelated/product.model';


export interface StockProductsModel {
  id: number;
  stockId: number;
  productId: number;
  quantity: number;
  isDeleted: boolean;
  product: ProductModel;


}
