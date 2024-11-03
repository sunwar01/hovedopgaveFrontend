import {ContactInfoModel} from '../shared/contactInfo.model';


export interface UserContactInfoModel extends ContactInfoModel
{
  userId: number;
}
