import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { rootReducer } from '@app/rootReducer'
import { baseApi } from '@shared/api'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { sourcesSlice } from '@entities/sources'
import { debugModeSlice } from '@shared/model'
import { sessionSlice } from '@entities/session'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { invalidateAccessTokenListener } from '@features/authentication/InvalidateAccessToken'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [sessionSlice.name, debugModeSlice.name, sourcesSlice.name],
}

export function makeStore() {
  const store = configureStore({
    reducer: persistReducer(
      persistConfig,
      rootReducer
    ) as unknown as typeof rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware, invalidateAccessTokenListener.middleware),
  })
  setupListeners(store.dispatch)

  return store
}

export const appStore = makeStore()
export const persistedStore = persistStore(appStore)


export type AppState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default appStore