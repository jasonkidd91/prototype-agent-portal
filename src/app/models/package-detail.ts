import { CommonMaintenance } from './common-maintenance';
import { SectionDetail } from './section-detail';

export interface PackageDetail {
    id?: number,
    section: CommonMaintenance,
    seq?: number,
    details?: Array<SectionDetail>
}