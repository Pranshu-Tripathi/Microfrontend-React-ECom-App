import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialPath: initialPath
    });
    if(onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(
        <App history={history} />, el
    );

    return {
        onParentNavigate({pathname : nextPathname}) {
            const { pathname } = history.location;
            if(pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
};

// in development, mount immediately
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// in container, export mount function
export { mount };