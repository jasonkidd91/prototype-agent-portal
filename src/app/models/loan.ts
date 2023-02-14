import { Base } from './base';
import { LoanType } from './loan-type';
import { Duration } from './duration';
import { Gender } from './gender';
import { BusinessType } from './business-type';
import { LoanDocument } from './loan-document';
import { Address } from './address';
import { LoanProviderType } from './loan-provider-type';
import { Bank } from './bank';
import { LoanStatus } from './loan-status';

export class Loan extends Base<string> {
    id: string;
    type: LoanType;
    amount: number;
    duration: Duration;
    gender: Gender;
    applicantName: string;
    idNo: string;
    phoneNumber: string;
    businessType: BusinessType;
    occupation: string;
    companyName: string;
    annualIncome: number;
    haveUnclearLoan: boolean;
    notes?: string;
    documents?: Array<LoanDocument>;
    residentialAddress: Address;
    mailingAddress: Address;
    loanProviderType: LoanProviderType;
    banks: Array<Bank>;
    status?: LoanStatus;
    emailAddress: string;
}