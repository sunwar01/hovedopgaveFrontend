
import {PaymentType} from '../../../enums/paymentType.enum';


export interface CounterReportPaymentsGetDto {
  id: number;
  counterReportId: number;
  paymentType: PaymentType;
  countedSum: number;
  registeredSum: number;
  Difference: number;
}
