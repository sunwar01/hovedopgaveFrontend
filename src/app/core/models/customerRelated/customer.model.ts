import {PaymentType} from '../../enums/paymentType.enum';
import {CustomerType} from '../../enums/customerType.enum';
import {UserContactInfoModel} from '../userRelated/userContactInfo.model';
import {CustomerContactInfoModel} from './customerContactInfo.model';

export interface CustomerModel {
  id: number;
  name: string;
  customerType: CustomerType;

  contactInfo: CustomerContactInfoModel;
}
