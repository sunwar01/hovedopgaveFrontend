import {ProductModel} from '../productRelated/product.model';


export interface CaseProductsModel {
  id: number;
  caseId: number;
  productId: number;
  quantity: number;
  isPaid: boolean;
  product: ProductModel;
}
