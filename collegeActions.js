import * as types from './index';
import axios from 'axios';
import qs from 'qs';

const BASE_URL = process.env.REACT_APP_API_URL


const addNewConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS'
    }
}



export const getCollegesRequest = () => {
    return {
        type: types.GET_COLLEGES_REQUEST
    }
}

export const getCollegesSuccess = users => {
    return {
        type: types.GET_COLLEGES_SUCCESS,
        payload: users
    }
}

export const getCollegesFailure = error => {
    return {
        type: types.GET_COLLEGES_FAILURE,
        payload: error
    }
}

export const addCollegeRequest = () => {
    return {
        type: types.ADD_COLLEGE_REQUEST
    }
}

export const addCollegeSuccess = college => {
    return {
        type: types.ADD_COLLEGE_SUCCESS,
        payload: college
    }
}

export const addCollegeFailure = error => {
    return {
        type: types.ADD_COLLEGE_FAILURE,
        payload: error
    }
}


export const deleteCollegeRequest = () => {
    return {
        type: types.DELETE_COLLEGE_REQUEST
    }
}

export const getCollegeRecord = users => {
    return {
        type: types.GET_COLLEGES_SUCCESS,
        payload: users
    }
}
export const deleteCollegeSuccess = college => {
    return {
        type: types.DELETE_COLLEGE_SUCCESS,
        payload: college
    }
}

export const deleteCollegeFailure = error => {
    return {
        type: types.DELETE_COLLEGE_FAILURE,
        payload: error
    }
}

export const updateCollegeNameRequest = () => {
    return {
        type: types.UPDATE_COLLEGE_NAME_REQUEST
    }
}

export const updateCollegeNameSuccess = college => {
    return {
        type: types.UPDATE_COLLEGE_NAME_SUCCESS,
        payload: college
    }
}

export const updateCollegeNameFailure = error => {
    return {
        type: types.UPDATE_COLLEGE_NAME_FAILURE,
        payload: error
    }
}

export const updateCollegeUniversityRequest = () => {
    return {
        type: types.UPDATE_COLLEGE_UNIVERSITY_REQUEST
    }
}

export const updateCollegeUniversitySuccess = college => {
    return {
        type: types.UPDATE_COLLEGE_UNIVERSITY_SUCCESS,
        payload: college
    }
}

export const updateCollegeUniversityFailure = error => {
    return {
        type: types.UPDATE_COLLEGE_UNIVERSITY_FAILURE,
        payload: error
    }
}

export const updateCollegeLiveStatusRequest = () => {
    return {
        type: types.UPDATE_COLLEGE_LIVE_STATUS_REQUEST
    }
}

export const updateCollegeLiveStatusSuccess = college => {
    return {
        type: types.UPDATE_COLLEGE_LIVE_STATUS_SUCCESS,
        payload: college
    }
}
export const logout = () => {
    return {
        type: types.LOGOUT
    }
}


export const getColleges = () => {
    return (dispatch) => {
        dispatch(getCollegesRequest)
        return axios.get(`${BASE_URL}/findCollege/0`)
            .then(res => {
                const colleges = res.data.data
                dispatch(getCollegesSuccess(colleges))

            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(getCollegesFailure(errorMsg))
            })

    };
}

export const addCollege = (college) => {
    return (dispatch) => {
        dispatch(addCollegeRequest)
        axios.post(`${BASE_URL}/addCollege?token=CSADMIN`, qs.stringify(college), addNewConfig)
            .then(res => {
                const newCollege = res.data.data
                dispatch(addCollegeSuccess(newCollege))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(addCollegeFailure(errorMsg))
            })
    }
}

export const deleteCollege = (college) => {
    return dispatch => {
        dispatch(deleteCollegeRequest)
        axios.delete(`${BASE_URL}/deleteCollege`, {

            data: college,
            headers: {
                authorization: localStorage.getItem('token'),

            }
        })
            .then(res => {
                dispatch(deleteCollegeSuccess(college.college_id))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(deleteCollegeFailure(errorMsg))
            })

    }
}

export const updateCollegeName = (college) => {
    return (dispatch) => {
        dispatch(updateCollegeNameRequest)
        axios.put(`${BASE_URL}/updateCollegeName`, qs.stringify(college), addNewConfig)
            .then(res => {
                dispatch(updateCollegeNameSuccess(college))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateCollegeNameFailure(errorMsg))
            })
    }
}

export const updateCollegeUniversity = (college) => {
    return (dispatch) => {
        // dispatch(updateCollegeUniversityRequest)
        axios.put(`${BASE_URL}/updateCollegeUniversity`, qs.stringify(college), addNewConfig)
            .then(res => {
                dispatch(updateCollegeUniversitySuccess(college))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateCollegeUniversityFailure(errorMsg))
            })
    }
}

export const updateCollegeLiveStatus = (college) => {
    return (dispatch) => {
        dispatch(updateCollegeUniversityRequest)
        axios.put(`${BASE_URL}/CollegeLiveStatus`, qs.stringify(college), addNewConfig)
            .then(res => {
                dispatch(updateCollegeLiveStatusSuccess(college))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(updateCollegeLiveStatusFailure(errorMsg))
            })
    }
}
