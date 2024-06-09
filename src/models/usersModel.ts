import { Model, ModelObject } from 'objection';

export class UsersModel extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
  created_at!: Date | string;
  updated_at!: Date | string;

  static get tableName() {
    return 'users';
  }
}

export type Users = ModelObject<UsersModel>;
