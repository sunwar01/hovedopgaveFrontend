
import {CounterReportPaymentsModel} from '../../counterReportPaymentsRelated/counterReportPayments.model';
import {CounterModel} from '../../counterRelated/counter.model';


export interface CounterReportGetDto {
  id: number;
  counterId: number;
  startHolding: number;
  StartDifference: number;
  openDateTime: Date;
  newHolding: number;
  newDifference: number;
  closeDateTime: Date;

  counter : CounterModel;

  counterReportPayments: CounterReportPaymentsModel[];
}
