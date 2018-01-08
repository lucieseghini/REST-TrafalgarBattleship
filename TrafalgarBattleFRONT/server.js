var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000 ;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// On se connecte à la base de données
// Ne pas oublier de lancer ~/mongodb/bin/mongod dans un terminal
mongoose.connect('mongodb://localhost/users');

// Création du schéma pour les pseudos
var userSchema = mongoose.Schema({
    pseudo: String
});

// Création du Model pour les pseudos
var User = mongoose.model('User', userSchema);

var router = express.Router();
router.route('/users')
    .get(function(req, res){
        User.find(function(err, users){
            if(err){
                res.send(err);
            }
            res.send(users);
        });
    })
    .post(function(req, res){
        var user = new User();
        user.pseudo = req.body.pseudo;
        user.save(function(err){
            if(err){
                res.send(err);
            }
            res.send({message : 'user created'});
        })
    });

router.route('/users/:user_id')
    .get(function(req, res){
        User.findOne({_id: req.params.user_id}, function(err, user){
            if(err){
                res.send(err);
            }
            res.send(user);
        });
    })
    .put(function(req, res){
        User.findOne({_id: req.params.user_id}, function(err, user){
            if(err){
                res.send(err);
            }
            user.pseudo = req.body.pseudo;
            user.save(function(err){
                if(err){
                    res.send(err);
                }
                res.send({message: 'book update'});
            });
        });
    })
    .delete(function(req, res){
        User.remove({_id: req.params.user_id}, function(err){
            if(err){
                res.send(err);
            }
            res.send({message: 'user deleted'});
        });
    });

app.use(router);
app.listen(port, function(){
    console.log('listening on port ' + port);
});