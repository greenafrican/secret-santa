import { combineReducers } from 'redux'
import {
    SUBMIT_OPTIN,
    REQUEST_OPTIN,
    RECEIVE_OPTIN
} from './actions'

function optIn(
    state = {
        isFetching: false,
        didInvalidate: false,
        data: {}
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_OPTIN:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_OPTIN:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_OPTIN:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                data: action.data,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function dataByOptInId(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_OPTIN:
        case RECEIVE_OPTIN:
        case REQUEST_OPTIN:
            return Object.assign({}, state, 
                optIn(state[action.optInId], action)
            )
        default:
            return state
    }
}

const rootReducer = combineReducers({
    dataByOptInId
})

export default rootReducer