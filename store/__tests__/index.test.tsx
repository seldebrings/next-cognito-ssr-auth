import { shallow } from "enzyme"
import React from "react"

import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as fetchMock from "isomorphic-fetch"
import * as actions from "../auth/actions"
import * as types from "../auth/types"
import * as consts from "../auth/consts"
import { apiUrl } from "../auth/utils"
import Router from "next/router"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
jest.mock("isomorphic-fetch")
Router.push = jest.fn()

describe("actions", () => {
   it("should create an action to set Auth object", () => {
    const auth: types.AuthState = consts.AUTH_INITIAL_STATE
    const expectedAction = {
      type: types.SET_AUTH,
      payload: auth
    }
    expect(actions.setAuth(auth)).toEqual(expectedAction)
  })
  it("should create an action to clear Auth object", () => {
    const expectedAction = {
      type: types.CLEAR_AUTH
    }
    expect(actions.clearAuth()).toEqual(expectedAction)
  })

  it("should create an action to set error string ", () => {
    const expectedAction = {
      type: types.SET_ERROR,
      payload: "My Error"
    }
    expect(actions.setError("My Error")).toEqual(expectedAction)
  })
  it("should create an action to set credentials ", () => {
    const credentials: types.CognitoCredentials = {
      email: "myemail@email.com",
      password: "password"
    }
    const expectedAction = {
      type: types.SET_CREDENTIALS,
      payload: credentials
    }
    expect(actions.setCognitoCredentials(credentials)).toEqual(expectedAction)
  }) 

  it("should create an action to clear credentials ", () => {
    const expectedAction = {
      type: types.CLEAR_CREDENTIALS
    }
    expect(actions.clearCognitoCredentials()).toEqual(expectedAction)
  })
})

describe("async actions", () => {
  afterEach(() => {
    //fetchMock.reset()
    //fetchMock.restore()
  })

   it("creates CLEAR_AUTH action when sign out api call has been done successfully", () => {
    fetchMock.postOnce("api/signout", { ok: true })

    const expectedActions = [{ type: types.CLEAR_AUTH }]
    const store = mockStore({ ...consts.AUTH_INITIAL_STATE })
    return store.dispatch(actions.signOut()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("creates actions when sign in api call has been done successfully", () => {
    fetchMock.postOnce("/api/signin", { ...consts.AUTH_INITIAL_STATE })
    const credentials: types.CognitoCredentials = {
      email: "email@email.com",
      password: "password"
    }

    const expectedActions = [
      { type: types.SET_CREDENTIALS, payload: credentials },
      { type: types.SET_LOADING, payload: true },
      { type: types.SET_AUTH, payload: consts.AUTH_INITIAL_STATE },
      { type: types.SET_LOADING, payload: false }
    ]
    const store = mockStore({ ...consts.AUTH_INITIAL_STATE })
    return store.dispatch(actions.signIn(credentials)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("creates actions when register api call has been done successfully", () => {
    const credentials: types.CognitoCredentials = {
      email: "email@email.com",
      password: "password"
    }

    fetchMock.postOnce("/api/register", { email: "email@email.com" })
    const expectedActions = [
      { type: types.SET_CREDENTIALS, payload: {  ...credentials }},
      { type: types.SET_LOADING, payload: true }, 
      { type: types.SET_LOADING, payload: false }
    ]
    const store = mockStore({ ...consts.AUTH_INITIAL_STATE })
    return store.dispatch(actions.register(credentials)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("creates actions when confirmregister api call has been done successfully", () => {
    const credentials: types.CognitoCredentials = {
      email: "email",
      confirmationCode: "confirmationCode"
    }
    fetchMock.postOnce("/api/confirmregister", { registered: true })
    const expectedActions = [
      { type: types.SET_CREDENTIALS, payload: credentials },
      { type: types.SET_LOADING, payload: true },
      { type: types.SET_AUTH, payload: { registered: true } },
      { type: types.SET_LOADING, payload: false }
    ]
    const store = mockStore({ ...consts.AUTH_INITIAL_STATE })
    return store.dispatch(actions.confirmRegister(credentials)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it("creates actions when resetpassword api call has been done successfully", () => {
    const credentials: types.CognitoCredentials = { email: "email" }
    fetchMock.postOnce("/api/resetpassword", { registered: true })
    const expectedActions = [
      { type: types.SET_CREDENTIALS, payload: credentials },
      { type: types.SET_LOADING, payload: true },
      { type: types.CLEAR_CREDENTIALS },
      { type: types.SET_LOADING, payload: false }
    ]
    const store = mockStore({ ...consts.AUTH_INITIAL_STATE })
    return store.dispatch(actions.resetPassword(credentials)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
}) 
