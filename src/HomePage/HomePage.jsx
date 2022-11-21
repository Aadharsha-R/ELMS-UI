import React, { useEffect } from 'react';
import { Route, Switch, Redirect,Link,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Nav, Alert } from '@/_components';
//import { Home } from '@/home';
import { Users } from '@/users';
import { Courses } from '@/courses';

import { userActions } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const { pathname } = useLocation(); 

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="app-container bg-light">
            {/* <Nav />
            <Alert />
            <div className="container pt-4 pb-4">*/}
                <Switch>
                    <Redirect from="/:url*(/+)" to= {pathname.slice(0, -1)} />
                    {/* <Route exact path="/" component={Home} />  */}
                    {/* <Route exact path="/users" component={Users} /> */}
                    <Route exact path="/courses" component={Courses} />
                    <Redirect from="*" to="/" />
                </Switch> 
        {/* <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <div>
            <h1>React - CRUD Example with React Hook Form</h1>
            <p>An example app showing how to list, add, edit and delete user records with React and the React Hook Form library.</p>
            <p><Link to="users">&gt;&gt; Manage Users</Link></p>
            
        </div>
        
            </div> 
        </div>
           <p>You're logged in with React Hooks!!</p> 
             <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            } */}
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };