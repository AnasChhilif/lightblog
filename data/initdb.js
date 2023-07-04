const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('base.sqlite');

function dropTables(){
    db.run('DROP TABLE IF EXISTS user');
    db.run('DROP TABLE IF EXISTS post');
}

function createUserTable(){
    db.run('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, sessionToken TEXT)');
}

//create table of posts with id, title, content, and date
function createPostTable(){
    db.run('CREATE TABLE IF NOT EXISTS post (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, date TEXT)');
}

//create functions to fill tables with dummy data

function filldata(){
    db.run('INSERT INTO user (name, email, password, sessionToken) VALUES ("admin", "admin@admin.com", "admin", "fneoqfq31feanfiea")');
    console.log('admin user created');
    db.run('INSERT INTO post (title, content, date) VALUES ("First Post", "This is the content of my first post", "2018-01-01")');
    db.run('INSERT INTO post (title, content, date) VALUES ("Second Post", "This is the content of my second post", "2018-01-02")');
    db.run('INSERT INTO post (title, content, date) VALUES ("Third Post", "This is the content of my third post", "2018-01-03")');
}

//call functions to create tables and fill with data
//dropTables();
createUserTable();
createPostTable();
filldata();
//close database connection
db.close();

