import {CaseType} from '../../enums/caseType.enum';
import {CaseStatus} from '../../enums/caseStatus.enum';

export interface CaseModel {
  id: number;
  status: CaseStatus;
  creator: number;
  storeId: number;
  customerId: number;
  Type: CaseType;
  isDeleted: boolean;
}
