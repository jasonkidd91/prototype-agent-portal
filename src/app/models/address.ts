import { Base } from './base';
import { AddressType } from './address-type';
import { State } from './state';
import { People } from './people';
import { Country } from './country';

export class Address extends Base<string> {
    id?: number;
    addressType?: AddressType;
    line1: string;
    line2?: string;
    line3?: string;
    postalCode?: string;
    cityName?: string;
    state?: State;
    provinceName?: string;
    latitude?: number;
    longitude?: number;
    people?: People;
    country?: Country;
}