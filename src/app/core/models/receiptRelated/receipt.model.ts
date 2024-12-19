import {UserModel} from '../userRelated/user.model';
import {CounterGetDto} from '../counterRelated/dto/counterGet.dto';
import {ReceiptLinesModel} from '../receiptLinesRelated/receiptLines.model';

export interface ReceiptModel {
  id: number;
  total: number;
  storeId: number;
  counterId: number;
  userId: number;
  caseId: number;

  user: UserModel;
  counter: CounterGetDto
  receiptLines : ReceiptLinesModel[];


}
