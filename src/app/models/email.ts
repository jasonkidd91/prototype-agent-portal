import { Base } from './base';
import { EmailType } from './email-type';
import { People } from './people';

export class Email extends Base<string> {
    id?: number;
    emailAddress: string;
    emailType?: EmailType;
    people?: People
}