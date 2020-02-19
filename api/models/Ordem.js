/**
	Generated by sails-inverse-model
	Date:Mon May 27 2019 15:05:05 GMT+0100 (Western European Summer Time)
*/

module.exports = {
    migrate: 'safe',
    attributes: {
        id: {
            columnName: 'nome',
            type: "string",
            columnType: "varchar",
            maxLength: 16,
            required: true
        },
        divisao: {
            type: "string",
            columnType: "varchar",
            maxLength: 16
        },
        subdivisao: {
            type: "string",
            columnType: "varchar",
            maxLength: 16
        },
        classe: {
            type: "string",
            columnType: "varchar",
            maxLength: 16
        },
        subclasse: {
            type: "string",
            columnType: "varchar",
            maxLength: 16
        },
        wiki_link: {
            type: "string",
            columnType: "varchar",
            maxLength: 64
        }
    }
};