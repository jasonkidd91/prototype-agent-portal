import { Base } from './base';

export abstract class MaintenanceBase<T> extends Base<T> {
    code: string;
    name?: string;
    notes?: string;
    active?: boolean;
}