import {CustomerType} from '../../../enums/customerType.enum';

export interface CustomerUpdateDto {
  name: string;
  phoneNumber: number;
  mail: string | undefined;

}
