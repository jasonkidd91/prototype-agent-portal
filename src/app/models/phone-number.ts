import { Base } from './base';
import { PhoneNumberType } from './phone-number-type';
import { Country } from './country';
import { People } from './people';

export class PhoneNumber extends Base<string> {
    id?: number;
    phoneNumberType?: PhoneNumberType;
    country?: Country;
    phoneNumber: string;
    people?: People;
    value?: string;
}