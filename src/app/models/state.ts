import { MaintenanceBase } from './maintenance-base';
import { Country } from './country';

export class State extends MaintenanceBase<number> {
    country: Country
}