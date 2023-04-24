
exports.up = function(knex) {
  return knex.schema.alterTable('movies', function(table){
    table.renameColumn('runtime_in_mins', 'runtime_in_minutes')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('movies', function(table){
    table.dropColumn('runtime_in_minutes')
  })
};
