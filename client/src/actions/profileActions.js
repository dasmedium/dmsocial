import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_EXPERIENCE,
  GET_EDUCATION
} from "./types";

const URI = "https://apibeta.tetoka.co";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${URI}/api/profile`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${URI}/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${URI}/api/profile/all`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post(`${URI}/api/profile`, profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Experience
export const addExperience = (profileData, history) => dispatch => {
  axios
    .post(`${URI}/api/profile/experience`, profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post(`${URI}/api/profile/education`, eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`${URI}/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Experience by ID
export const getExperienceById = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${URI}/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXPERIENCE,
        payload: null
      })
    );
};

// Edit Experience
export const editExperience = (id, expData, history) => dispatch => {
  axios
    .post(`${URI}/api/profile/experience/${id}`, expData)

    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Education by ID
export const getEducationById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${URI}/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_EDUCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EDUCATION,
        payload: null
      })
    );
};

// Edit Education
export const editEducation = (id, eduData, history) => dispatch => {
  axios
    .post(`${URI}/api/profile/education/${id}`, eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`${URI}/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Account and Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can Not be undone!")) {
    axios
      .delete(`${URI}/api/profile`)
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile Loading
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
