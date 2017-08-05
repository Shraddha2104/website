var mysql = require('mysql');
var dbconfig = require('../config/database.student');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `name` VARCHAR(20) NOT NULL, \
    `standard` CHAR(60) NOT NULL, \
    `marks` int(20) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `name_UNIQUE` (`name` ASC) \
)');

console.log('Success: Database Created!')

connection.end();