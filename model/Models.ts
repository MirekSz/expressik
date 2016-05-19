import * as Sequelize from 'sequelize';

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

export var Operator = sequelize.define('operator', {
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
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
});

export var PasswordRule = sequelize.define('password_rule', {
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
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
});

PasswordRule.hasMany(Operator, {foreignKey: 'id_password_rule'});
Operator.hasOne(PasswordRule, {foreignKey: 'id_password_rule', as: 'PasswordRule'});
