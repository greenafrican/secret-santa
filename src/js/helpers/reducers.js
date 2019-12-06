import { combineReducers } from 'redux'
import {
    REQUEST_OPTIN,
    RECEIVE_OPTIN
} from './actions'

function optIn(state, action) {
    switch (action.type) {
        case REQUEST_OPTIN:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_OPTIN:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function dataByOptInId(state = {}, action) {
    switch (action.type) {
        case RECEIVE_OPTIN:
        case REQUEST_OPTIN:
            return Object.assign({}, state, optIn(state, action))
        default:
            return state
    }
}

const rootReducer = combineReducers({
    dataByOptInId
})

export default rootReducer