const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('base.sqlite');

// the database has 2 tables: user and post

function getUser(username, callback) {
  db.get('SELECT sessionToken FROM user WHERE username = ?', username, function(err, row) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, row);
    }
  });
}

function setSessionToken(username, sessionToken, callback) {
    db.run('UPDATE user SET sessionToken = ? WHERE username = ?', sessionToken, username, function(err) {
    if (err) {
        console.log(err);
        callback(err);
    } else {
        callback(null);
    }
    });
}

function getPosts(callback) {
  db.all('SELECT * FROM post', function(err, rows) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, rows);
    }
  });
}

function addPost(post, callback) {
    db.run(INSERT INTO post (title, content, date) VALUES (?, ?, ?), post.title, post.content, post.date, function(err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null);
    }
  });
}

function deletePost(id, callback) {
  db.run('DELETE FROM post WHERE id = ?', id, function(err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null);
    }
  });
}
