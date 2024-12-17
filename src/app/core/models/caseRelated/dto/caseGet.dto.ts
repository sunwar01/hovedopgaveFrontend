import {CaseStatus} from '../../../enums/caseStatus.enum';
import {CaseType} from '../../../enums/caseType.enum';

export interface CaseGetDto {
  id: number;
  status: CaseStatus;
  creator: number;
  storeId: number;
  customerId: number;
  Type: CaseType;
  dateCreated: Date;

}
