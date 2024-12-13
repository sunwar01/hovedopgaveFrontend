import {CaseStatus} from '../../../enums/caseStatus.enum';
import {CaseType} from '../../../enums/caseType.enum';

export interface CasePostDto {
  status: CaseStatus;
  creator: number;
  storeId: number;
  customerId: number;
  Type: CaseType;
}
