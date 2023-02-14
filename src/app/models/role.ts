import { Base } from './base';
import { Authority } from './authority';
import { User } from './user';

export class Role extends Base<string> {
    roleCode?: string;
    authorities?: Array<Authority>;
    users?: Array<User>;
}