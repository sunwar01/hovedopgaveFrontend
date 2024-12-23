
import {CounterReportPaymentsModel} from '../../counterReportPaymentsRelated/counterReportPayments.model';


export interface CounterReportGetDto {
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
