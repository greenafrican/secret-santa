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
        data: json.data,
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
        return fetch(`${DEV_URL}${optInId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveOptIn(optInId, json)))
    }
}

function shouldFetchOptIn(state, optInId) {
    const optIn = ('id' in state.optIn) && state.optIn['id'] === optInId
    if (!optIn) {
        return true
    } else if (optIn.isFetching) {
        return false
    } else {
        return optIn.didInvalidate
    }
}

export function fetchOptInIfNeeded(optIn) {
    return (dispatch, getState) => {
        if (shouldFetchOptIn(getState(), optIn)) {
            return dispatch(fetchOptIn(optIn))
        }
    }
}