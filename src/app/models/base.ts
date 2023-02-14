import { BaseClass } from '../utils/base-class';

export abstract class Base<T> extends BaseClass {
    createdBy?: T;
    creationDate?: Date;
    lastModifiedBy?: T;
    lastModifiedDate?: Date;
    version?: number;

    constructor(base?: Base<T>) {
        super();
        if (!base) return;
        this.createdBy = base.createdBy;
        this.creationDate = base.creationDate;
        this.lastModifiedBy = base.lastModifiedBy;
        this.lastModifiedDate = base.lastModifiedDate;
        this.version = base.version;
    }
}