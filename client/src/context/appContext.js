import React, { useContext, useReducer, useEffect } from 'react';
// import { questions, answers } from '../database/data';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  LOGOUT_USER,
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

// reload data from local storage if exists
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

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
    'TestQuizzes',
    'sysadmin_cli',
    'sysadmin_bash_script',
    'sysadmin_regex',
    'sysadmin_filesystem',
    'sysadmin_users_groups',
  ],
  topic: 'TestQuizzes',
  time_start: -1,

  // for results
  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
  result: [],
  userLoading: true,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  /* using this approach when store token localStorage and globalState when development to sending back the token every request to verify in the server */

  // axios configuration request
  authFetch.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

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

  /* using this approach when store token, user, and location in localStorage and globalState when development */

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // setup parameters as a object to not worry about ordering
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      // login and register user

      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      /* using this approach if server sending back reponse with token */
      const { user, token } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        // pass to the reducer.js
        payload: {
          user,
          alertText,

          /* using this approach if server sending back reponse with token */
          token,
        },
      });

      /* Using this approach when enable LocalStorage function */
      // persist data to LocalStorage
      addUserToLocalStorage({ user, token });

      // get all new batches of questions from Google spreadsheet when the user login/register
      await authFetch.delete('/questions');
      await authFetch.post('/questions');
    } catch (error) {
      // console.log(error);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
    /* Using this approach when enable LocalStorage function */
    removeUserFromLocalStorage();
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

  const saveResult = async ({
    totalQuizPoint,
    totalQuestions,
    totalAttemps,
    earnPoints,
    quizResult,
    // rank,
  }) => {
    try {
      const { result, user } = state;

      const r = await authFetch.post('/results', {
        userName: user.name,
        resultOptions: result,
        totalQuizPoint,
        totalQuestions,
        totalAttemps,
        earnPoints,
        quizResult,
        topic: state.topic,
        // rank,
      });

      console.log(r);
    } catch (error) {
      console.log(error);
    }
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

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch.get('/auth/getCurrentUser');
      const { user } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      // console.log(error.response);
      // if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        addUserToLocalStorage,
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
        saveResult,
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
