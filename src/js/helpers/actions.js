import fetch from 'cross-fetch'
import DEV_URL from '../../../backend';
import Campaigns from '../skins/campaigns.js';

export const REQUEST_GROUP = 'REQUEST_GROUP';
export const RECEIVE_GROUP = 'RECEIVE_GROUP';
export const REQUEST_CAMPAIGN = 'REQUEST_CAMPAIGN';
export const RECEIVE_CAMPAIGN = 'RECEIVE_CAMPAIGN';

function requestGroup() {
    return {
        type: REQUEST_GROUP
    }
}

function receiveGroup(json) {
    return {
        type: RECEIVE_GROUP,
        data: json,
        receivedAt: Date.now()
    }
}

function requestCampaign() {
    return {
        type: REQUEST_CAMPAIGN
    }
}

function receiveCampaign(campaign) {
    return {
        type: RECEIVE_CAMPAIGN,
        campaign: campaign,
        receivedAt: Date.now()
    }
}

export function postGroup(group, campaignName) {
    return dispatch => {
        dispatch(requestGroup());
        return fetch(`${DEV_URL}/${campaignName}`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(group)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveGroup(json)));
    }
}

function fetchCampaign(campaignName) {
    return dispatch => {
        dispatch(requestCampaign());
        const frontCampaign = Campaigns.find(d => d.key === campaignName);
        return fetch(`${DEV_URL}/${campaignName}`)
            .then(response => response.json())
            .then(apiCampaign => dispatch(receiveCampaign(Object.assign({}, frontCampaign, apiCampaign))));
    }
}

export function postMember(campaignName, groupId, member) {
    return dispatch => {
        dispatch(requestGroup());
        return fetch(`${DEV_URL}/${campaignName}/${groupId}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        })
            .then(response => response.json())
            .then(json => dispatch(receiveGroup(json)))
    }
}
function fetchGroup(campaignName, groupId) {
    return dispatch => {
        dispatch(requestGroup())
        return fetch(`${DEV_URL}/${campaignName}/${groupId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveGroup(json)))
    }
}

export function acceptGroup(campaignName, groupId, memberId) {
    return dispatch => {
        dispatch(requestGroup())
        return fetch(`${DEV_URL}/${campaignName}/${groupId}/accept/${memberId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveGroup(json)))
    }
}

function shouldFetchGroup(state, groupId) {
    const group = state.hasOwnProperty('data') && state.data.hasOwnProperty('group_id') && state.data['group_id'] === groupId
    if (!group) {
        return true;
    } else if (group.isFetching) {
        return false;
    }
    return false;
}

export function fetchGroupIfNeeded(campaignName, groupId) {
    return (dispatch, getState) => {
        if (shouldFetchGroup(getState(), groupId)) {
            return dispatch(fetchGroup(campaignName, groupId))
        }
    }
}

function shouldFetchCampaign(state, campaignName) {
    const thisCampaign = state.hasOwnProperty('campaign') && state.data.hasOwnProperty('key') && state.data['key'] === campaignName;
    if (!thisCampaign) {
        return true;
    } else if (thisCampaign.isFetching) {
        return false;
    }
    return true;
}

export function fetchCampaignIfNeeded(campaignName) {
    return (dispatch, getState) => {
        if (shouldFetchCampaign(getState(), campaignName)) {
            return dispatch(fetchCampaign(campaignName))
        }
    }
}