import {CustomerType} from '../../../enums/customerType.enum';

export interface CustomerPostDto {
  name: string;
  phoneNumber: number;
  mail: string;
  customerType: CustomerType;
}
