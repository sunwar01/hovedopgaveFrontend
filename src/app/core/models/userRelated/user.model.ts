import {UserContactInfoModel} from './userContactInfo.model';
import {AuthenticationModel} from './authentication.model';


export interface UserModel
{
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  isDeleted: boolean;

  userContactInfo: UserContactInfoModel;
  userAuthentication: AuthenticationModel;
}
