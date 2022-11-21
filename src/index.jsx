import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import './styles.less';

// setup fake backend
import { configureFakeBackend,configureFakeUserBackend,configureFakeCourseBackend } from './_helpers';
configureFakeBackend();
//configureFakeUserBackend();
configureFakeCourseBackend();

render(
 
    <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
   </Provider>
   ,
    document.getElementById('app')
);