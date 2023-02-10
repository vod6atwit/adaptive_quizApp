import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  START_EXAM_BEGIN,
  START_EXAM_SUCCESS,
  SET_USER_ID,
  MOVE_NEXT_ACTION,
  MOVE_PREV_ACTION,
  SET_RESULT_ACTION,
} from './actions';

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
      alearText: '',
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
      queue: action.payload.queue,
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
      result: [...state.result, action.payload.result],
    };
  }

  throw new Error(`no such action ${action}`);
};

export default reducer;
