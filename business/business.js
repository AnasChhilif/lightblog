const data = require('../data/datalayer.js');


let business = {
    login : function (username, password, callback) {
        data.getUser(username, function(err, user) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                if (user && user.password === password) {
                    let sessionToken = Math.floor(Math.random() * 1000000000);
                    data.setSessionToken(username, sessionToken, function(err) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            callback(null, sessionToken);
                        }
                    });
                    callback(null, user.sessionToken);
                } else {
                    callback(null, null);
                }
            }
        });
    },

    getAllPosts : function (callback) {
        data.getAllPosts(function(err, posts) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, posts);
            }
        });
    },

    getPosts : function(number, page, callback){
        data.getPosts(number, page, function(err, posts) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, posts);
            }
        });
    },

    addPost : function (post, callback) {
        data.addPost(post, function(err) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null);
            }
        });
    },

    deletePost : function (id, callback) {
        data.deletePost(id, function(err) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null);
            }
        });
    },


}

module.exports = business;
