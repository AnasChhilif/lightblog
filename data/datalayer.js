const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('base.sqlite');

// the database has 2 tables: user and post

let data = {
    getUser : function (username, callback) {
      db.get('SELECT sessionToken FROM user WHERE username = ?', username, function(err, row) {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, row);
        }
      });
    },

    setSessionToken : function (username, sessionToken, callback) {
        db.run('UPDATE user SET sessionToken = ? WHERE username = ?', sessionToken, username, function(err) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(null);
        }
        });
    },

    getAllPosts : function (callback) {
      db.all('SELECT * FROM post', function(err, rows) {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, rows);
        }
      });
    },

    getPosts : function(number, page, callback){
        db.all('SELECT * FROM post LIMIT ? OFFSET ?', number, page, function(err, rows) {
            if (err) {
            console.log(err);
            callback(err);
            } else {
            callback(null, rows);
            }
        });
    },

    addPost : function (post, callback) {
        db.run('INSERT INTO post (title, content, date) VALUES (?, ?, ?)', post.title, post.content, post.date, function(err) {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null);
        }
      });
    },

    deletePost : function (id, callback) {
      db.run('DELETE FROM post WHERE id = ?', id, function(err) {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null);
        }
      });
    }
}

data.getAllPosts(function(err, posts) {
    if (err) {
        console.log(err);
    } else {
        console.log(posts);
    }
});


module.exports = data;
