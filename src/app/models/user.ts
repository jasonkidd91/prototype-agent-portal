import { Base } from './base';
import { Role } from './role';
import { Authority } from './authority';

export class User extends Base<string> {
    uid?: string;
    userCode?: string;
    roles?: Array<Role>;
    authorities?: Array<Authority>;
    superior?: User;
    subordinates?: Array<User>;
    active?: boolean;
}