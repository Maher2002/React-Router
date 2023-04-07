import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return { status: "pending", data: null, error: null };
  }

  if (action.type === "SUCCESS") {
    return {
      status: "completed",
      data: action.responseData,
      error: null,
    };
  }

  if (action.type === "ERROR") {
    return { status: "completed", data: null, error: action.error };
  }

  return state;
};

const useHttp = (requestFun, startWithPending = false) => {
  //

  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND" });

      try {
        const responseData = await requestFun(requestData);

        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          error: error.message || "Something is wrong",
        });
      }
    },
    [requestFun]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
