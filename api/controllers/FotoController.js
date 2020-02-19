/**
 * Foto
 *
 * @description :: Server-side logic for managing Foto
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    toJSON: async function(req, res){
        result = await Foto.find({
            
          });
          if (result.length > 0) {
              //console.log(JSON.stringify(result));
            return res.json(result);
        }
    },

    uploadFoto: async function(req, res){

        /*req.file('filename').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000
          },function whenDone(err, uploadedFiles) {
            if (err) {
              return res.serverError(err);
            }
        
            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0){
              return res.badRequest('No file was uploaded');
            }
        
            // Get the base URL for our deployed application from our custom config
            // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
            var baseUrl = sails.config.custom.baseUrl;
        
            // Save the "fd" and the url where the avatar for a user can be accessed
            User.update(req.session.userId, {
        
              // Generate a unique URL where the avatar can be downloaded.
              avatarUrl: require('util').format('%s/user/avatar/%s', baseUrl, req.session.userId),
        
              // Grab the first file and use it's `fd` (file descriptor)
              avatarFd: uploadedFiles[0].fd
            })
            .exec(function (err){
              if (err) return res.serverError(err);
              return res.ok();
            });
          });

        /////////////////////////////////////

        if (req.method === 'POST') {
 
            req.file('filename').upload({dirname : process.cwd() + '/assets/images/uploads/'}, function (err, uploadedFiles) {
              if (err) return res.send(500, err);
 
                var filename = uploadedFiles[0].fd.substring(uploadedFiles[0].fd.lastIndexOf('/')+1);
                var uploadLocation = process.cwd() +'/assets/images/uploads/' + filename;
                var tempLocation = process.cwd() + '/.tmp/public/images/uploads/' + filename;
 
                //Copy the file to the temp folder so that it becomes available immediately
                fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
 
                //Redirect or do something
                res.view();
            });
                        
        } else {
             
            res.view();
             
        }*/
    },

    getCapa: async function(especie, req, res){
        const foto = await Foto.find({
            id_especie: especie,
            foto_capa: 1
          });
          console.log(especie)
          console.log(foto)
          if (foto.length > 0) {
              //console.log(JSON.stringify(result));
            return foto[0].nome_ficheiro;
        } else {
            return 'semfotos.jpg'
        }
    }

};