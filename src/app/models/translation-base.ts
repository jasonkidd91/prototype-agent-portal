import { TranslationId } from './translation-id';

export abstract class TranslationBase {
    id: TranslationId<string>;
    name?: string;
    notes?: string;
}