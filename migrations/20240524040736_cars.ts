import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.integer('price', 255).notNullable();
    table.text('picture').notNullable();
    table.string('category').notNullable();
    table.boolean('availability').notNullable().defaultTo(false);
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();
    table.string('created_by',255).notNullable();
    table.string('updated_by',255).nullable();
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars');
}
