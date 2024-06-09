import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
  id!: number;
  name!: string;
  price!: number;
  picture!: string;
  category!: string;
  availability!: boolean;
  start_date!: string;
  end_date!: string;
  created_by!: string;
  updated_by!: string;
  created_at!: Date | string;
  updated_at!: Date | string;

  static get tableName() {
    return 'cars';
  }
}

export type Cars = ModelObject<CarsModel>;
