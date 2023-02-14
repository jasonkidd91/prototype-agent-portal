import { MaintenanceBase } from './maintenance-base';
import { People } from './people';

export class Occupation extends MaintenanceBase<number> {
    monthlyIncome?: number;
    selfEmployed?: boolean;
    companyName?: string;
    people?: People
}