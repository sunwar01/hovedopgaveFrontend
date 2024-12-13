import {ContactInfoModel} from '../shared/contactInfo.model';


export interface CustomerContactInfoModel extends ContactInfoModel
{
  customerId: number;
}
