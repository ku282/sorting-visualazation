import * as types from './index';
import axios from 'axios';
import qs from 'qs';

const BASE_URL = process.env.REACT_APP_API_URL


const addNewConfig = {
    headers: {
        'Content-Type': `multipart/form-data`
    }
}

const getConfig = {
    headers: {
        'authorization': localStorage.getItem('token'),
        'accept': 'application/json'

    }
}

const deleteConfig = {
    headers: {
        'authorization': localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const getVideoCategoriesRequest = () => {
    return {
        type: types.GET_VIDEO_CATEGORIES_REQUEST
    }
}

export const getVideoCategoriesSuccess = videos => {
    return {
        type: types.GET_VIDEO_CATEGORIES_SUCCESS,
        payload: videos
    }
}

export const getVideoCategoriesFailure = error => {
    return {
        type: types.GET_VIDEO_CATEGORIES_FAILURE,
        payload: error
    }
}

export const addVideoCategoryRequest = () => {
    return {
        type: types.ADD_VIDEO_CATEGORY_REQUEST
    }
}

export const addVideoCategorySuccess = video => {
    return {
        type: types.ADD_VIDEO_CATEGORY_SUCCESS,
        payload: video
    }
}

export const addVideoCategoryFailure = error => {
    return {
        type: types.ADD_VIDEO_CATEGORY_FAILURE,
        payload: error
    }
}






export const getVideoCategories = () => {
    return (dispatch) => {
        dispatch(getVideoCategoriesRequest)
        axios.get(`${BASE_URL}/getVideoCatgeory`, getConfig)
            .then(res => {
                const videos = res.data.data
                dispatch(getVideoCategoriesSuccess(videos))


            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(getVideoCategoriesFailure(errorMsg))
            })

    };
}

export const addVideoCategory = (videoCategory) => {
    return (dispatch) => {
        dispatch(addVideoCategoryRequest)
        axios.post(`${BASE_URL}/videoCategoryUpload`, qs.stringify(videoCategory), deleteConfig)
            .then(res => {
                const newVideoCategory = res.data.data
                dispatch(addVideoCategorySuccess(newVideoCategory))
            })
            .catch(err => {
                const errorMsg = err.message
                dispatch(addVideoCategoryFailure(errorMsg))
            })
    }
}


