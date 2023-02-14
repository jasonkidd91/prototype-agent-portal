import { Base } from './base';
import { User } from './user';
import { Role } from './role';

export class Authority extends Base<string> {
    authorityCode?: string;
    users?: Array<User>;
    roles?: Array<Role>;
}