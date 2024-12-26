import {PaymentType} from '../../../enums/paymentType.enum';

export interface CounterSalesGetDto {
  id: number;
  receiptId: number;
  paymentType: PaymentType;
  amount: number;
  storeId: number;
  counterId: number;
  saleDateTime: Date;
}
