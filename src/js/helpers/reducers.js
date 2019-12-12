import { combineReducers } from 'redux'
import {
    REQUEST_GROUP,
    RECEIVE_GROUP,
    RECEIVE_CAMPAIGN,
    REQUEST_CAMPAIGN
} from './actions'

function optIn(state, action) {
    switch (action.type) {
        case REQUEST_GROUP:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_GROUP:
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
        case REQUEST_CAMPAIGN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_CAMPAIGN:
            return Object.assign({}, state, {
                isFetching: false,
                campaign: action.campaign,
                lastUpdated: action.receivedAt
            })
        default:
            return state;
    }
}

function dataByGroupId(state = {}, action) {
    switch (action.type) {
        case RECEIVE_GROUP:
        case REQUEST_GROUP:
            return Object.assign({}, state, optIn(state, action))
        default:
            return state
    }
}

function campaignByCampaignName(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CAMPAIGN:
        case REQUEST_CAMPAIGN:
            return Object.assign({}, state, campaign(state, action));
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    dataByGroupId,
    campaignByCampaignName
})

export default rootReducer