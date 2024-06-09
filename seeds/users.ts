import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'fadilgemoy',
      email: 'fadil123@gmail.com',
      password: '$2y$10$0EH25zCGDplob3v9LRI4OeSe0iVrEQuTTD2h5W9usfYtSysWQx1ba', // fadil123456
      role: 'superadmin'
    },
  ]);
}
