import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';

const configureStore = (initialState = {}) => {
    let store;
    if (process.env.NODE_ENV !== 'production') {
        store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./rootReducer', () => {
                const nextRootReducer = require('./rootReducer').default;

                store.replaceReducer(nextRootReducer);
            });
        }
    } else {
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    }

    return store;
};

export default configureStore;
