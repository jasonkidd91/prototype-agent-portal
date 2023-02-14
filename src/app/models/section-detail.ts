import { CommonTranslation } from './common-translation';

export interface SectionDetail {
    id?: number,
    name?: string,
    seq: number,
    translations?: Array<CommonTranslation<string>>,
    childs?: Array<SectionDetail>
}