"use strict";
const Sequelize = require('sequelize');
var sequelize = new Sequelize('verto_dev', 'verto_dev', 'verto_devverto_dev', {
    host: 'strumyk-next-db',
    port: 5432,
    dialect: 'postgres',
    pool: {
        maxConnections: 5,
        minConnections: 0,
        maxIdleTime: 10000
    },
});
exports.Operator = sequelize.define('operator', {
    id: {
        primaryKey: true,
        field: 'id_operator',
        type: Sequelize.NUMERIC
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.PasswordRule = sequelize.define('password_rule', {
    id: {
        primaryKey: true,
        field: 'id_password_rule',
        type: Sequelize.NUMERIC
    },
    name: {
        type: Sequelize.STRING,
        field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    active: {
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.PasswordRule.hasMany(exports.Operator, { foreignKey: 'id_password_rule' });
exports.Operator.hasOne(exports.PasswordRule, { foreignKey: 'id_password_rule', as: 'PasswordRule' });
//# sourceMappingURL=Models.js.map