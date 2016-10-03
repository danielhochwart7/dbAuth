var db = require('../db_config.js');

exports.list = function(callback) {
    db.User.find({}, function(error, users) {
        if(error) {
            callback({error: 'Error while retrieving users from database'})
        } else {
            callback(users);
        }
    });
};

exports.checkOnExistence = function (obj, callback) {
    db.User.findOne(obj, callback);
};

exports.user = function(id, callback) {
    db.User.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Error while retrieving user id: ' + id});
        } else {
            callback(user);
        }
    });
};

exports.save = function(name, price, quantity, callback) {
    new db.User({
        'username': name,
        'password': price
    }).save(function(error, user) {
        if(error) {
            callback({error: 'Error on adding user to database'});
        } else {
            callback(user);
        }
    });
};

exports.update = function(id, username, password, callback) {
    db.User.findById(id, function(error, user) {
        if (username) {
            user.username = username;
        }

        if (password) {
            user.password = password;
        }

        user.save(function(error, user) {
            if (error) {
                callback({error: 'Não foi possível atualizar o user.'});
            } else {
                callback(user);
            }
        });
    });
};

exports.delete = function(id, callback) {
    db.User.findById(id, function(error, user) {
        if(error) {
            callback({error: 'Não foi possível deletar o user...'})
        } else {
            user.remove(function (error) {
                if(!error) {
                    callback({response: 'User excluido com sucesso'});
                }
            });
        }
    });
};
