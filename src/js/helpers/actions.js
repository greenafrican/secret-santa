import fetch from 'cross-fetch'

export const REQUEST_OPTIN = 'REQUEST_OPTIN';
export const RECEIVE_OPTIN = 'RECEIVE_OPTIN';
export const DEV_URL = 'https://c99krn5i75.execute-api.eu-west-1.amazonaws.com/development/';

function requestOptIn() {
    return {
        type: REQUEST_OPTIN
    }
}

function receiveOptIn(json) {
    return {
        type: RECEIVE_OPTIN,
        data: json,
        receivedAt: Date.now()
    }
}

export function postOptIn(group) {
    return dispatch => {
        dispatch(requestOptIn());
        return fetch(`${DEV_URL}`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(group)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveOptIn(json)))
    }
}

function fetchOptIn(groupId) {
    return dispatch => {
        dispatch(requestOptIn())
        return fetch(`${DEV_URL}${groupId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveOptIn(json)))
    }
}

export function acceptOptIn(groupId, memberId) {
    return dispatch => {
        dispatch(requestOptIn())
        return fetch(`${DEV_URL}${groupId}/accept/${memberId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveOptIn(json)))
    }
}

function shouldFetchOptIn(state, groupId) {
    const group = state.hasOwnProperty('data') && state.data.hasOwnProperty('group_id') && state.data['group_id'] === groupId
    if (!group) {
        return true
    } else if (group.isFetching) {
        return false
    }
}

export function fetchOptInIfNeeded(groupId) {
    return (dispatch, getState) => {
        if (shouldFetchOptIn(getState(), groupId)) {
            return dispatch(fetchOptIn(groupId))
        }
    }
}