import { AppBase } from './app-base';
import { Duration } from './duration';
import { AppBaseTranslation } from './app-base-translation';
import { CommonTranslation } from './common-translation';
import { PackageDetail } from './package-detail';
import { LoanType } from './loan-type';
import { PackageTranslation } from './package-translation';
import { Bank } from './bank';

export interface Packages extends AppBase<number, string>, AppBaseTranslation<PackageTranslation> {
    duration: Duration,
    active?: boolean,
    startAt?: Date,
    endAt?: Date,
    packageDetails: Array<PackageDetail>,
    type: LoanType,
    imageUrl?: string,
    interestRate: number,
    loanAmount: number,
    bestRate: boolean,
    monthlyInstallmentAmount?: number,
    inStock?: number,
    applied?: number,
    bank?: Bank
}