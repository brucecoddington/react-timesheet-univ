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
export default {
  path: '/', component: Index,
  childRoutes: [
    {path: 'login', component: Login},
    {path: '/', component: App,
      childRoutes: [
        {path: 'projects', component: Projects},
        {path: 'projects/detail/:_id', component: ProjectsDetail},
        {path: 'projects/create', component: ProjectsCreate},

        {path: 'employees', component: Employees},
        {path: 'employees/detail/:_id', component: EmployeesDetail},
        {path: 'employees/create', component: EmployeesCreate},

        {path: 'employees/:user_id/timesheets', component: Timesheets},
        {path: 'employees/:user_id/timesheets/create', component: TimesheetsCreate},
        {path: 'employees/:user_id/timesheets/detail/:_id', component: TimesheetsDetail},

        {path: 'employees/:user_id/timesheets/detail/:_id/timeunits/create', component: TimeunitsCreate},
        {path: 'employees/:user_id/timesheets/detail/:_id/timeunits/edit/:timeunit_id', component: TimeunitsEdit}
      ]
    }
  ]
};
