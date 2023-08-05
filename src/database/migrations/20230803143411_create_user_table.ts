import { Knex } from "knex";
import { DefinedTableNames, DefinedSchemaNames } from '../../app/utils/constants';

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable(DefinedTableNames.USER)) {
    return;
  }

  await knex.schema.raw(`CREATE SCHEMA IF NOT EXISTS ${DefinedSchemaNames.ACCOUNT_SERVICE};`);

  return await knex.schema
    .withSchema(DefinedSchemaNames.ACCOUNT_SERVICE)
    .createTable(DefinedTableNames.USER, (table) => {
      table.uuid('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('user_name').notNullable();
      table.string('email').notNullable();
      table.string('phone').notNullable();
      table.string('password').notNullable();
      table.string('profile_pics_url').nullable();
      table.string('bio').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').nullable().defaultTo(null);
    });
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.withSchema(DefinedSchemaNames.ACCOUNT_SERVICE).dropTable(DefinedTableNames.USER);
}
