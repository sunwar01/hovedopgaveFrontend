import {UserModel} from '../userRelated/user.model';
import {CounterGetDto} from '../counterRelated/dto/counterGet.dto';

export interface ReceiptModel {
  id: number;
  total: number;
  storeId: number;
  counterId: number;
  userId: number;
  caseId: number;

  user: UserModel;
  counter: CounterGetDto


}
