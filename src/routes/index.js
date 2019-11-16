import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import StudentList from '~/pages/Student/List';
import StudentForm from '~/pages/Student/Form';
import PlanList from '~/pages/Plan/List';
import PlanForm from '~/pages/Plan/Form';
import Register from '~/pages/Register';
import HelpOrder from '~/pages/HelpOrder';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/student/list" component={StudentList} isPrivate />
            <Route path="/student/form" component={StudentForm} isPrivate />
            <Route path="/plan/list" component={PlanList} isPrivate />
            <Route path="/plan/form" component={PlanForm} isPrivate />
            <Route path="/register" component={Register} isPrivate />
            <Route path="/help-order" component={HelpOrder} isPrivate />
        </Switch>
    );
}
