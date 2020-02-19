/**
 * TDate ToString
 *
 * @description :: Server-side logic for converting a T formated date in a well formed sentece to show Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    friendlyName: 'Format Date',
    
    
    description: 'Return a personalized string based on the provided date.',
    
    
    inputs: {
        tdate: {
            type: 'string',
            example: '2011-05-26T07:56:00.123Z',
            description: 'String of date on T format',
            required: true
          }
    },
    
    
    fn: async function (inputs, exits) {

        date = new Date(inputs.tdate);

        //console.log(inputs.tdate);
        //console.log(date);

        var newDate = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"][date.getDay()] +
                    ', ' + date.getDate() + ' de ' + 
                    ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][date.getMonth()] + 
                    ' de ' + date.getFullYear() + 
                    ' às ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        return exits.success(newDate);
    }
    
    };

