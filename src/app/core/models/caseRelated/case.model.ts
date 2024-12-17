import {CaseType} from '../../enums/caseType.enum';
import {CaseStatus} from '../../enums/caseStatus.enum';
import {StoreModel} from '../storeRelated/store.model';
import {UserModel} from '../userRelated/user.model';
import {CustomerModel} from '../customerRelated/customer.model';
import {CaseContentModel} from '../caseContentRelated/caseContent.model';
import {CaseNotesModel} from '../caseNotesRelated/caseNotes.model';
import {CaseProductsModel} from '../caseProductRelated/caseProducts.model';

export interface CaseModel {
  id: number;
  status: CaseStatus;
  creator: number;
  storeId: number;
  customerId: number;
  Type: CaseType;
  isDeleted: boolean;
  dateCreated: Date;

  store: StoreModel;
  customer: CustomerModel;
  user : UserModel;
  caseContent: CaseContentModel[];
  caseNotes: CaseNotesModel[];
  caseProducts: CaseProductsModel[];

}
