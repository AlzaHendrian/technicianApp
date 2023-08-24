export const loginReducer = (state, payload) => {
  return {
    ...state,
    authentication: {
      isLogin: true,
      user: payload,
    },
  };
};

export const logoutReducer = state => {
  return {
    ...state,
    authentication: {
      isLogin: false,
      user: null,
    },
  };
};
