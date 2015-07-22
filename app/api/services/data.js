let _ = require('lodash'),
  db = require('./db'),
  Q = require('q'),
  bcrypt = require('bcrypt');

exports.init = init;

function init () {
  db.findOne('users', {username: 'admin'})
  .then(function (user) {
    console.log("Found user. DB already seeded.");
    if (user === null) seed();
  })
  .fail(function (err) {
    console.log("Error : " + err);
  });
}

////////////  USERS //////////////////
function seed() {
  console.log('Seeding Users into DB');
  let users = require('../../../data/users').users;

  let userPromises = [];

  _.forEach(users, function (user) {
    console.log("Seeding " + user.username);

    bcrypt.hash(user.password, 10, function (err, hash) {
      user.password = hash;
      db.insert('users', user)
        .then(function (){
          console.log("Created user " + user.username + " and timesheets.");
        })
        .fail(function (err) {
          console.log("Error creating " + user.username + " : " + err);
        });;
    });
  });
})


}
