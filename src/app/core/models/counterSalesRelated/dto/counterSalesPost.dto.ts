import {PaymentType} from '../../../enums/paymentType.enum';

export interface CounterSalesPostDto {
  receiptId: number | null;
  paymentType: PaymentType;
  amount: number;
  storeId: number | undefined;
  counterId: number | undefined;
}
