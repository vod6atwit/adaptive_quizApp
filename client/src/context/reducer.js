import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  LOGOUT_USER,
  START_EXAM_BEGIN,
  START_EXAM_SUCCESS,
  FINISH_EXAM_ACTION,
  RESTART_EXAM_ACTION,
  SET_USER_ID,
  MOVE_NEXT_ACTION,
  MOVE_PREV_ACTION,
  SET_CHECK_ANSWER,
  SET_UNCHECK_ANSWER,
  SET_RESULT_ACTION,
  UPDATE_RESULT_ACTION,
  HANDLE_CHANGE,
} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values',
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      // using this line if you send the token with the payload in appContext
      token: action.payload.token,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,

      //// using this line if you send the token with the payload in appContext
      // user: null,
      // token: null,
      // userLocation: '',
      // jobLocation: '',
    };
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === START_EXAM_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === START_EXAM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      queue: action.payload.questions,
    };
  }

  if (action.type === FINISH_EXAM_ACTION) {
    return {
      ...state,
      answers: action.payload.answers,
    };
  }

  if (action.type === RESTART_EXAM_ACTION) {
    return {
      ...initialState,
    };
  }

  if (action.type === SET_CHECK_ANSWER) {
    return {
      ...state,
      isCheck: true,
    };
  }

  if (action.type === SET_UNCHECK_ANSWER) {
    return {
      ...state,
      isCheck: false,
    };
  }

  if (action.type === MOVE_NEXT_ACTION) {
    return {
      ...state,
      trace: state.trace + 1,
    };
  }

  if (action.type === MOVE_PREV_ACTION) {
    return {
      ...state,
      trace: state.trace - 1,
    };
  }

  if (action.type === SET_USER_ID) {
    return {
      ...state,
      userId: action.payload,
    };
  }
  if (action.type === SET_RESULT_ACTION) {
    return {
      ...state,
      result: [...state.result, action.payload.checked],
    };
  }
  if (action.type === UPDATE_RESULT_ACTION) {
    return {
      ...state,
      result: state.result.fill(
        action.payload.checked,
        action.payload.trace,
        action.payload.trace + 1
      ),
    };
  }

  throw new Error(`no such action ${action}`);
};

export default reducer;
