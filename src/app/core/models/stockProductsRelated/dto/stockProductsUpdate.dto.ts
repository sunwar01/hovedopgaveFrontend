import {StockChangeType} from '../../../enums/stockChangeType.enum';

export interface StockProductsUpdateDto {

  id: number;
  quantity: number;
  userId: number;
  ChangeType: StockChangeType;

}
