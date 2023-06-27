import { Role } from 'src/roles/entities/role.entity';
import { UserCredential } from 'src/users/entities/UserCredential.entities';
import { User } from '../users/entities/user.entity';

const entities = [Role, User, UserCredential];

export { Role, User, UserCredential };
export default entities;
