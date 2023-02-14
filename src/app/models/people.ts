import { Base } from './base';
import { Gender } from './gender';
import { PhoneNumber } from './phone-number';
import { Email } from './email';
import { Address } from './address';
import { Occupation } from './occupation';
import { Name } from './name';
import { Password } from './password';

export class People extends Base<string> {
    id?: string;
    gender: Gender;
    phoneNumbers?: Array<PhoneNumber>;
    emails: Array<Email>;
    addresses?: Array<Address>;
    occupations?: Array<Occupation>;
    name: Name;
    idNo: string;
    photoUrl?: string;
    notes?: string;
    password?: Password;
    agreeTNC?: boolean;

    constructor(people: People) {
        super(people);
        this.id = people.id;
        this.gender = people.gender;
        this.emails = people.emails;
        this.name = people.name;
        this.idNo = people.idNo;
        this.photoUrl = people.photoUrl;
        this.notes = people.notes;
        this.password = people.password;
        this.agreeTNC = people.agreeTNC;

        if (!this.notEmptyString(people.phoneNumbers[0].phoneNumber)) {
            this.phoneNumbers = undefined;
        } else this.phoneNumbers = people.phoneNumbers;

        if (!this.notEmptyString(people.addresses[0].line1)) {
            this.addresses = undefined;
        } else this.addresses = people.addresses;

        if (!this.notEmptyString(people.occupations[0].name) && !this.notEmptyString(people.occupations[0].companyName)) {
            this.occupations = undefined;
        } else this.occupations = people.occupations;
    }
}