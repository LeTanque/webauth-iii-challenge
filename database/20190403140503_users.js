exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users
            .string('username', 128)
            .notNullable()
            .unique();
        users.string('password', 128).notNullable();
        users.string('department', 128)
        users.integer('role').defaultTo(1);
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
