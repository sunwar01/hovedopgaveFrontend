import {StoreModel} from '../../storeRelated/store.model';


export interface CounterGetDto {
  id: number;
  storeId: number;
  name: string;
  startHolding: number;
  currentHolding: number;
  status: boolean;

  store: StoreModel;
  // counterReports: CounterReportsModel[];
  // receipts: ReceiptModel[];

}
