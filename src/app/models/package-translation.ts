import { CommonTranslation } from './common-translation';

export interface PackageTranslation extends CommonTranslation<number> {
    termAndCondition?: string,
    remarks?: string
}