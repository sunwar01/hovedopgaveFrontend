import {PaymentType} from '../../../enums/paymentType.enum';


export interface  CounterReportPaymentsPostDto {
  counterReportId: number;
  paymentType: PaymentType;
  countedSum: number;
  registeredSum: number;
  Difference: number;
}
