import React, { useContext, useReducer } from 'react';
import { questions, answers } from '../database/data';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  START_EXAM_BEGIN,
  START_EXAM_SUCCESS,
  RESTART_EXAM_ACTION,
  FINISH_EXAM_ACTION,
  SET_USER_ID,
  MOVE_NEXT_ACTION,
  SET_CHECK_ANSWER,
  SET_UNCHECK_ANSWER,
  MOVE_PREV_ACTION,
  SET_RESULT_ACTION,
  UPDATE_RESULT_ACTION,
  HANDLE_CHANGE,
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
  isCheck: false,
  topicOptions: [
    'sysadmin_cli',
    'sysadmin_bash_script',
    'sysadmin_regex',
    'sysadmin_filesystem',
    'sysadmin_users_groups',
    'TestQuizzes',
  ],
  topic: 'sysadmin_cli',

  // for results
  userId: null,
  result: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // axios configuration response
  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error.response);
      // log the user out if unauthorized
      // if (error.response.status === 401) {
      //   logoutUser();
      // }
      return Promise.reject(error);
    }
  );

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
    const { topic } = state;
    let url = `/questions?topic=${topic}`;

    dispatch({ type: START_EXAM_BEGIN });
    try {
      const { data } = await authFetch.get(url);

      const { total, questions } = data;
      // console.log(questions);

      dispatch({
        type: START_EXAM_SUCCESS,
        payload: {
          questions,
          // answer,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const finishExamAction = () => {
    const { queue } = state;
    const answers = [];

    for (let i = 0; i < queue.length; i++) {
      answers.push(queue[i].options.indexOf(queue[i].answer));
    }
    dispatch({ type: FINISH_EXAM_ACTION, payload: { answers } });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
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

  const setCheckedAnswer = () => {
    dispatch({ type: SET_CHECK_ANSWER });
  };

  const setUncheckedAnswer = () => {
    dispatch({ type: SET_UNCHECK_ANSWER });
  };

  const pushAnswer = checked => {
    dispatch({
      type: SET_RESULT_ACTION,
      payload: {
        checked,
      },
    });
  };

  const updateAnswer = ({ trace, checked }) => {
    dispatch({
      type: UPDATE_RESULT_ACTION,
      payload: {
        trace,
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
        finishExamAction,
        reStartExamAction,
        moveNextQuestion,
        movePrevQuestion,
        setUserId,
        pushAnswer,
        updateAnswer,
        setCheckedAnswer,
        setUncheckedAnswer,
        handleChange,
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
