import { TranslationMaintenanceBase } from './translation-maintenance-base';
import { PaymentTermTranslation } from './payment-term-translation';
import { Duration } from './duration';

export class PaymentTerm extends TranslationMaintenanceBase<PaymentTermTranslation, string> {
    duration: Duration;

    constructor(code: string, name: string, duration: Duration) {
        super();
        this.code = code;
        this.name = name;
        this.duration = duration;
    }
}