import {StoreModel} from '../storeRelated/store.model';
import {CaseContentModel} from '../caseContentRelated/caseContent.model';
import {ReceiptModel} from '../receiptRelated/receipt.model';
import {CounterReportPaymentsModel} from '../counterReportPaymentsRelated/counterReportPayments.model';


export interface CounterReportModel {
  id: number;
  counterId: number;
  startHolding: number;
  StartDifference: number;
  openDateTime: Date;
  newHolding: number;
  newDifference: number;
  closeDateTime: Date;



  counterReports: CounterReportPaymentsModel[];


}
