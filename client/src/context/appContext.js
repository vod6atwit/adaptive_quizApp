import React, { useContext, useReducer } from 'react';
import data from '../database/data';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  START_EXAM_BEGIN,
  START_EXAM_SUCCESS,
  RESTART_EXAM_ACTION,
  SET_USER_ID,
  MOVE_NEXT_ACTION,
  MOVE_PREV_ACTION,
  SET_RESULT_ACTION,
} from './actions';
import reducer from './reducer';

const initialState = {
  // for register/login
  isLoading: false,
  showAlert: false,
  alertType: '',
  alertText: '',

  // for questions
  queue: [],
  answers: [],
  trace: 0,

  // for results
  userId: null,
  result: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const startExamAction = async () => {
    dispatch({ type: START_EXAM_BEGIN });
    try {
      const queue = await data;

      dispatch({
        type: START_EXAM_SUCCESS,
        payload: {
          queue,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reStartExamAction = () => {
    dispatch({ type: RESTART_EXAM_ACTION });
  };

  const moveNextQuestion = () => {
    dispatch({ type: MOVE_NEXT_ACTION });
  };

  const movePrevQuestion = () => {
    dispatch({ type: MOVE_PREV_ACTION });
  };

  const setUserId = () => {
    dispatch({ type: SET_USER_ID });
  };

  const pushAnswer = checked => {
    dispatch({
      type: SET_RESULT_ACTION,
      payload: {
        checked,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        startExamAction,
        reStartExamAction,
        moveNextQuestion,
        movePrevQuestion,
        setUserId,
        pushAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
