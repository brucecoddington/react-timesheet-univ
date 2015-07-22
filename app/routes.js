import React from 'react/addons';
import Router, {Route, Redirect, DefaultRoute, NotFoundRoute} from 'react-router';

import Index from './components/index';
import App from './components/app';
import Login from './components/login/login';

import Projects from './components/projects/projects';
import ProjectsDetail from './components/projects/project.detail';
import ProjectsCreate from './components/projects/project.create';

import Employees from './components/employees/employees';
import EmployeesDetail from './components/employees/employee.detail';
import EmployeesCreate from './components/employees/employee.create';

import Timesheets from './components/timesheets/timesheets';
import TimesheetsDetail from './components/timesheets/timesheet.detail';
import TimesheetsCreate from './components/timesheets/timesheet.create';

import TimeunitsCreate from './components/timeunits/timeunit.create';
import TimeunitsEdit from './components/timeunits/timeunit.detail';

// Initialize the routes
export default (
  <Route name="index" path="/" handler={Index}>
    <Route name='login' path='/login' handler={Login} />

    <Route name='app' path="/" handler={App}>

      <Route name='projects'          path='/projects'              handler={Projects} />
      <Route name='projects.detail'   path='/projects/detail/:_id'  handler={ProjectsDetail} />
      <Route name='projects.create'   path='/projects/create'       handler={ProjectsCreate} />

      <Route name='employees'         path='/employees'             handler={Employees} />
      <Route name='employees.detail'  path='/employees/detail/:_id' handler={EmployeesDetail} />
      <Route name='employees.create'  path='/employees/create'      handler={EmployeesCreate} />

      <Route name='timesheets'        path='/employees/:user_id/timesheets'             handler={Timesheets} />
      <Route name='timesheets.create' path='/employees/:user_id/timesheets/create'      handler={TimesheetsCreate} />
      <Route name='timesheets.detail' path='/employees/:user_id/timesheets/detail/:_id' handler={TimesheetsDetail} />

      <Route name='timesheets.detail.timeunits.create' path='/employees/:user_id/timesheets/detail/:_id/timeunits/create'            handler={TimeunitsCreate} />
      <Route name='timesheets.detail.timeunits.detail'   path='/employees/:user_id/timesheets/detail/:_id/timeunits/edit/:timeunit_id' handler={TimeunitsEdit} />

      <Redirect to="employees" />
    </Route>

  </Route>
);
