import {PaymentType} from '../../enums/paymentType.enum';

export interface CounterSalesModel {
  id: number;
  receiptId: number;
  paymentType: PaymentType;
  amount: number;
  storeId: number;
  counterId: number;
  saleDateTime: Date;
}
