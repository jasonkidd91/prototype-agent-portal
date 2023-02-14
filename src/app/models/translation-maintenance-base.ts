import { MaintenanceBase } from './maintenance-base';

export abstract class TranslationMaintenanceBase<TRANSLATE, T> extends MaintenanceBase<T> {
    translations?: Array<TRANSLATE>;
}