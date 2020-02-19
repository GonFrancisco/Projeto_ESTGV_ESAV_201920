/**
 * Create Especies Folder
 *
 * @description :: Server-side logic for managing the creation of inexistent folder por species in assets/images/galeria/especies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
module.exports = {

    friendlyName: 'Format welcome message',
    
    
    description: 'Return a personalized greeting based on the provided name.',
    
    
    inputs: {
    
    },
    
    
    fn: async function (inputs, exits) {

        especies = await Especie.find({select: ['genero', 'nome', 'sub_especie']});
        //console.log(especies);
        if(especies.length > 0){
            var folder_name = "";
            for(especie of especies){
                //console.log(especie);
                folder_name = especie.genero + '_' + especie.nome + '_' + especie.sub_especie;

                fs.mkdir('assets/images/galeria/especies/' + folder_name, 0744, function(err) {
                    if (err) {
                        if (err.code == 'EEXIST')  console.log(folder_name + ' ja existe'); // ignore the error if the folder already exists
                        else console.log(folder_name + ' erro inesperado'); // something else went wrong
                    } else console.log(folder_name + ' criada com sucesso'); // successfully created folder
                });
                 
            }
            
        }
        return exits.success();
    }
    
    };

