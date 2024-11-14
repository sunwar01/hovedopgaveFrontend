import {StockModel} from '../../stockRelated/stock.model';

export interface StoreGetDto {
  id: number;
  name: string;
  city: string;
  picture: string;
  stock: StockModel;

}
