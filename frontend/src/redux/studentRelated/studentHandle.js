import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
  deleteSuccess,
} from "./studentSlice";
const REACT_APP_BASE_URL = "http://localhost:5000";
export const getAllStudents = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${REACT_APP_BASE_URL}/Students/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.delete(`${REACT_APP_BASE_URL}/Students/${id}`);
    if (result.status === 204) {
      // No content means deletion was successful
      dispatch(stuffDone());
    } else {
      dispatch(getFailed(result.data.message));
    }
  } catch (error) {
    dispatch(getError(error.message || "Failed to delete student."));
  }
};

export const updateStudentFields =
  (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
      const result = await axios.put(
        `${REACT_APP_BASE_URL}/${address}/${id}`,
        fields,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data.message) {
        dispatch(getFailed(result.data.message));
      } else {
        dispatch(stuffDone());
      }
    } catch (error) {
      dispatch(getError(error));
    }
  };

export const removeStuff = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(`${REACT_APP_BASE_URL}/${address}/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
