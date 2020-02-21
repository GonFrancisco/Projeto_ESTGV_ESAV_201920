/**
	Generated by sails-inverse-model
	Date:Mon May 27 2019 15:05:05 GMT+0100 (Western European Summer Time)
*/

const bcrypt = require('bcrypt');

module.exports = {
    migrate: 'safe',
    attributes: {
        id: {
            type: "number",
            columnName: 'id',
            columnType: "int",
            isInteger: true,
            autoIncrement: true
        },
        pnome: {
            type: "string",
            columnType: "varchar",
            maxLength: 32,
            required: true
        },
        unome: {
            type: "string",
            columnType: "varchar",
            maxLength: 32,
            required: true
        },
        mail: {
            type: "string",
            columnType: "varchar",
            maxLength: 64,
            isEmail: true,
            required: true
        },
        hashpw: {
            type: "string",
            columnType: "varchar",
            maxLength: 60
        },
        isadmin: {
            type: "number",
            columnType: "tinyint",
            isInteger: true,
            defaultsTo: 0
        }
    },
    beforeCreate: function(user, callback){
        //console.log(user.hashpw);
        bcrypt.genSalt(10, function(err, salt){
            //console.log(user.hashpw);
            bcrypt.hash(user.hashpw, salt, function(err, hash){
                if(err) return callback(err);
                user.hashpw = hash;
                //console.log(user.hashpw);
                return callback();
            });
        });
    }
};