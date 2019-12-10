import { combineReducers } from 'redux'
import {
    REQUEST_OPTIN,
    RECEIVE_OPTIN,
    RECEIVE_CAMPAIGN
} from './actions'

function optIn(state, action) {
    switch (action.type) {
        case REQUEST_OPTIN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_OPTIN:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

function campaign(state, action) {
    switch (action.type) {
        case RECEIVE_CAMPAIGN:
            console.log(action);
            return Object.assign({}, state, {
                campaign: action.campaign
            })
        default:
            return state;
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

function campaignByCampaignName(state = {}, action) {
    console.log(action);
    switch (action.type) {
        case RECEIVE_CAMPAIGN:
            return Object.assign({}, state, campaign(state, action));
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    dataByOptInId,
    campaignByCampaignName
})

export default rootReducer