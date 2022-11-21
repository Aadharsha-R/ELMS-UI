import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
//import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

import { Nav, Alert } from '@/_components';
import { HomePage } from '@/HomePage';
import { Courses } from '../courses';
import { Users } from '../users';


function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const { pathname } = useLocation(); 
    

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="app-container bg-light">
        <Nav />
        <Alert />
        <div className="container pt-4 pb-4"></div>
        {/* <div className="jumbotron"> */}
            <div className="container">
                <div className="col-md-8 offset-md-2">
              
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            {/* <Route path="/users" component={Users} /> */}
                    <Route path="/courses" component={Courses} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
            
        {/* </div> */}
        </div>
        
    );
}

export { App };