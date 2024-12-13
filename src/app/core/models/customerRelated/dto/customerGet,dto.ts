import {CustomerType} from '../../../enums/customerType.enum';
import {CustomerContactInfoModel} from '../customerContactInfo.model';

export interface CustomerGetDto {
  id: number;
  name: string;
  customerType: CustomerType;
  contactInfo: CustomerContactInfoModel;
}
