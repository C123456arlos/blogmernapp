import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import themeReducer from './theme/themeSlice'

const actualStorage = storage.default || storage
const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer
})

const persistConfig = {
    key: 'root',
    storage: actualStorage,
    version: 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        { serializableCheck: false }
    )
})
export const persistor = persistStore(store)















// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import userReducer from './user/userSlice';
// import themeReducer from './theme/themeSlice';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'




// import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import userReducer from './user/userSlice'
// import { persistReducer, persistStore } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import themeReducer from './theme/themeSlice'


// const actualStorage = storage.default || storage

// const rootReducer = combineReducers({
//     user: userReducer,
//     theme: themeReducer,
// });

// const persistConfig = {
//     key: 'root',
//     actualStorage,
//     version: 1,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);

























// console.log(storage)
// console.log(typeof storage.getItem)
// console.log(typeof storage.setItem)


// {
//   __esModule: true,
//   default: { getItem, setItem, removeItem }
// }



// import * as storage from 'redux-persist/lib/storage'


// import storage from 'redux-persist/lib/storage'
// const actualStorage = storage.default || storage



// const persistConfig = {
//   key: 'root',
//   storage: actualStorage,
//   version: 1,
// }