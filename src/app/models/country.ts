import { MaintenanceBase } from './maintenance-base';

export class Country extends MaintenanceBase<number> {
    callingCode?: string;
}