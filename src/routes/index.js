import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Student from '~/pages/Student';
import Plan from '~/pages/Plan';
import Register from '~/pages/Register';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/student" component={Student} isPrivate />
            <Route path="/plan" component={Plan} isPrivate />
            <Route path="/register" component={Register} isPrivate />
        </Switch>
    );
}
