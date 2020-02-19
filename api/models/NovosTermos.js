/**
	Generated by sails-inverse-model
	Date:Mon May 27 2019 15:05:05 GMT+0100 (Western European Summer Time)
*/

module.exports = {
    migrate: 'safe',
    attributes: {
        id: {
            type: "string",
            columnName: 'termo_pesquisa',
            columnType: "varchar",
            maxLength: 32,
            required: true
        },
        contagem: {
            type: "number",
            columnType: "int",
            isInteger: true,
            defaultsTo: 0
        }
    }
};