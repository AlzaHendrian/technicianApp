export const addTeknisi = (state, payload) => {
  return {
    ...state,
    teknisi: {
      teknisi: payload,
    },
  };
};
