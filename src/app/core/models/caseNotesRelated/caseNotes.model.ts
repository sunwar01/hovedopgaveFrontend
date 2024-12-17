import {UserModel} from '../userRelated/user.model';


export interface CaseNotesModel {
  id: number;
  text: string;
  caseId: number;
  userId: number;
  dateAdded: Date;
  isDeleted: boolean;

  user: UserModel;

}
