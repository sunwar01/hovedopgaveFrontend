import {StoreModel} from '../storeRelated/store.model';
import {CaseContentModel} from '../caseContentRelated/caseContent.model';
import {ReceiptModel} from '../receiptRelated/receipt.model';


export interface CounterModel {
  id: number;
  storeId: number;
  name: string;
  status: boolean;
  isDeleted: boolean;

  store: StoreModel;
 // counterReports: CounterReportsModel[];
 // receipts: ReceiptModel[];

}
