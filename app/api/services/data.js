import _ from 'lodash';
import db from './db';
import bcrypt from 'bcrypt';

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
        .then(() => {
          console.log("Created user " + user.username + " and timesheets.");
        })
        .fail(err => {
          console.log("Error creating " + user.username + " : " + err);
        });;
    });
  });
}

export default {
  init () {
    db.findOne('users', {username: 'admin'})
      .then(user => {
        console.log("Found user. DB already seeded.");
        if (user === null) seed();
      })
      .fail(err => {
        console.log("Error : " + err);
      });
  }
};
