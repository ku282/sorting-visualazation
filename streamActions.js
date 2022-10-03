import * as types from './index';
import axios from 'axios';
import qs from 'qs';

const addNewConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const getStreamsFailure = error => {
    return {
        type: types.GET_STREAMS_FAILURE,
        payload: error
    }
}

export const addStreamRequest = () => {
    return {
        type: types.ADD_STREAM_REQUEST
    }
}

export const addStreamSuccess = stream => {
    return {
        type: types.ADD_STREAM_SUCCESS,
        payload: stream
    }
}

export const addStreamFailure = error => {
    return {
        type: types.ADD_STREAM_FAILURE,
        payload: error
    }
}

export const deleteStreamRequest = () => {
    return {
        type: types.DELETE_STREAM_REQUEST
    }
}

export const deleteStreamSuccess = stream => {
    return {
        type: types.DELETE_STREAM_SUCCESS,
        payload: stream
    }
}

export const deleteStreamFailure = error => {
    return {
        type: types.DELETE_STREAM_FAILURE,
        payload: error
    }
}


export const updateStreamNameRequest = () => {
    return {
        type: types.UPDATE_STREAM_NAME_REQUEST
    }
}

export const updateStreamNameSuccess = course => {
    return {
        type: types.UPDATE_STREAM_NAME_SUCCESS,
        payload: course
    }
}

export const updateStreamNameFailure = error => {
    return {
        type: types.UPDATE_STREAM_NAME_FAILURE,
        payload: error
    }
}

export const updateStreamCourseRequest = () => {
    return {
        type: types.UPDATE_STREAM_COURSE_REQUEST
    }
}

export const updateStreamCourseSuccess = course => {
    return {
        type: types.UPDATE_STREAM_COURSE_SUCCESS,
        payload: course
    }
}

export const updateStreamCourseFailure = error => {
    return {
        type: types.UPDATE_STREAM_COURSE_FAILURE,
        payload: error
    }
}

export const updateStreamLiveStatusRequest = () => {
    return {
        type: types.UPDATE_STREAM_LIVE_STATUS_REQUEST
    }
}

export const updateStreamLiveStatusSuccess = course => {
    return {
        type: types.UPDATE_STREAM_LIVE_STATUS_SUCCESS,
        payload: course
    }
}

export const updateStreamLiveStatusFailure = error => {
    return {
        type: types.UPDATE_STREAM_LIVE_STATUS_FAILURE,
        payload: error
    }
}


export const getStreams = () => {
    return (dispatch) => {
        dispatch(getStreamsRequest)
        axios.get(`${process.env.REACT_APP_API_URL}/findStream/0`)
            .then(res => {
                const streams = res.data.data
                dispatch(getStreamsSuccess(streams))

            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(getStreamsFailure(errorMsg))
            })

    };
}

export const addStream = (stream) => {
    return (dispatch) => {
        dispatch(addStreamRequest)
        axios.post(`${BASE_URL}/addStream?token=CSADMIN`, qs.stringify(stream), addNewConfig)
            .then(res => {
                const newStream = res.data.data
                dispatch(addStreamSuccess(newStream))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(addStreamFailure(errorMsg))
            })
    }
}

export const deleteStream = (stream) => {
    return dispatch => {
        dispatch(deleteStreamRequest)
        axios.delete(`${BASE_URL}/deleteStreams`, {

            data: stream,
            headers: {
                authorization: localStorage.getItem('token'),

            }
        })
            .then(res => {
                dispatch(deleteStreamSuccess(stream.stream_id))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(deleteStreamFailure(errorMsg))
            })

    }
}
const BASE_URL = process.env.REACT_APP_API_URL



export const updateStreamName = (stream) => {
    return (dispatch) => {
        dispatch(updateStreamNameRequest)
        axios.put(`${BASE_URL}/updateStreamName`, qs.stringify(stream), addNewConfig)
            .then(res => {
                dispatch(updateStreamNameSuccess(stream))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateStreamNameFailure(errorMsg))
            })
    }
}

export const updateStreamCourse = (stream) => {
    return (dispatch) => {
        // dispatch(updateStreamCourseRequest)
        axios.put(`${BASE_URL}/updateStreamsCourse`, qs.stringify(stream), addNewConfig)
            .then(res => {
                dispatch(updateStreamCourseSuccess(stream))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateStreamCourseFailure(errorMsg))
            })
    }
}

export const updateStreamLiveStatus = (stream) => {
    return (dispatch) => {
        dispatch(updateStreamLiveStatusRequest)
        axios.put(`${BASE_URL}/streamLiveStatus`, qs.stringify(stream), addNewConfig)
            .then(res => {
                dispatch(updateStreamLiveStatusSuccess(stream))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateStreamLiveStatusFailure(errorMsg))
            })
    }
}
