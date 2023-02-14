import { TranslationId } from './translation-id';

export interface CommonTranslation<ID> {
    id: TranslationId<ID>,
    name?: string,
    notes?: string
}