import _ from 'lodash';
import db from './db';
import Q from 'q';
import bcrypt from 'bcrypt';

import usersDb from '../../../data/users';
import adminTimesheetsDb from '../../../data/admin.timesheets';
import userTimesheetsDb from '../../../data/user.timesheets';
import projectsDb from '../../../data/projects';

export default {
  init: init
};

function init () {
  db.findOne('users', {username: 'admin'})
  .then(function (user) {
    if (user === null) {
      seed();
    }
    else {
      console.log("Found user. DB already seeded.");
    }
  })
  .fail(function (err) {
    console.log("Error : " + err);
  });
}

////////////  USERS //////////////////
function seed() {
  console.log('Seeding Users into DB');
  let users = usersDb.users;
  let adminTimesheets = adminTimesheetsDb.timesheets;
  let userTimesheets = userTimesheetsDb.timesheets;
  let projects = projectsDb.projects;

  Q.all([
    db.insert('projects', projects[0]),
    db.insert('projects', projects[1]),
    db.insert('projects', projects[2])
  ])

  .then(function () {
    let userPromises = [];

    _.forEach(users, function (user) {
      console.log("Seeding " + user.username);

      bcrypt.hash(user.password, 10, function (err, hash) {
        user.password = hash;

        db.insert('users', user)
          .then(function (newUser) {

            console.log("Created " + newUser.username);

            let timesheets = user.username === "admin" ? adminTimesheets: userTimesheets;

            _.forEach(timesheets, function (timesheet) {
              let timesheetModel = _.omit(timesheet, 'timeunits');
              timesheetModel.user_id = newUser._id;

              db.insert('timesheets', timesheetModel)
                .then(function (newTimesheet) {

                  console.log("Seeding timeunits : " + timesheet.timeunits.length);

                  _.forEach(timesheet.timeunits, function (timeunit) {
                    timeunit.timesheet_id = newTimesheet._id;

                    console.log("Attempting to seed timeunit : " + timeunit.project);
                    db.findOne('projects', {name: timeunit.project})
                      .then(function (project) {
                        timeunit.project_id = project._id;
                        return db.insert('timeunits', timeunit);
                      })
                      .then(function (newTimeunit) {
                        console.log("Created timeunit for " + newTimeunit.dateWorked);
                      })
                      .fail(function (err) {
                        console.log("Error : " + err);
                      });
                  });
                });
            });
          });
      });
    });
  })

  .then(function (){
    console.log("Created user " + user.username + " and timesheets.");
  })

  .fail(function (err) {
    console.log("Error creating " + user.username + " : " + err);
  });
}
