import fetch from 'cross-fetch'

export const REQUEST_OPTIN = 'REQUEST_OPTIN'
export const RECEIVE_OPTIN = 'RECEIVE_OPTIN'
export const SUBMIT_OPTIN = 'SUBMIT_OPTIN'
export const DEV_URL = 'https://c99krn5i75.execute-api.eu-west-1.amazonaws.com/development/'

export function submitOptIn(optIn) {
    return {
        type: SUBMIT_OPTIN,
        optIn
    }
}

function requestOptIn(optInId) {
    return {
        type: REQUEST_OPTIN,
        optInId
    }
}

function receiveOptIn(optInId, json) {
    return {
        type: RECEIVE_OPTIN,
        optInId,
        data: json,
        receivedAt: Date.now()
    }
}

function postOptIn(optIn) {
    return dispatch => {
        dispatch(submitOptIn(optIn))
        return fetch(`${DEV_URL}`, {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(optIn)
            })
            .then(response => response.json())
            .then(json => dispatch(receiveOptIn(optIn['id'], json)))
    }
}

function fetchOptIn(optInId) {
    return dispatch => {
        dispatch(requestOptIn(optInId))
        return fetch(`${DEV_URL}${optInId}`, {
                method: 'get',
                mode: 'no-cors'
            })
            .then(response => response.json())
            .then(json => dispatch(receiveOptIn(optInId, json)))
    }
}

function shouldFetchOptIn(state, optInId) {
    console.log(state, optInId);
    const optIn = state.hasOwnProperty('data') && state.data.hasOwnProperty('id') && state.optIn['id'] === optInId
    if (!optIn) {
        return true
    } else if (optIn.isFetching) {
        return false
    }
}

export function fetchOptInIfNeeded(optInId) {
    console.log(optInId)
    return (dispatch, getState) => {
        if (shouldFetchOptIn(getState(), optInId)) {
            return dispatch(fetchOptIn(optInId))
        }
    }
}