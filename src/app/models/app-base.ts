import { User } from './user';

export interface AppBase<ID, USER> {
    id?: ID,
    createdBy?: USER,
    creationDate?: Date,
    lastModifiedBy?: USER,
    lastModifiedDate?: Date,
    version?: number
}