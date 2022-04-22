export default function fetchHandler({
  url,
  method,
  actionType,
  body,
  shouldDispatch = true,
}) {
  return async (dispatch) => {
    const headersData = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const promise = fetch(`${url}`, {
      method,
      headers: headersData,
      body,
    });

    const response = await promise;
    return responseHandler(response, actionType, dispatch, shouldDispatch);
  };
}

/**
 * responseHandler
 * @param {*} response
 * @param {*} actionType
 * @param {*} dispatch
 * @param {*} shouldDispatch
 * @returns
 */
async function responseHandler(response, actionType, dispatch, shouldDispatch) {
  let json;
  try {
    json = response.json && (await response.json());
  } catch (error) {
    console.log(`Response is not a json object`); // eslint-disable-line no-console
  }
  json = json || {};

  if (200 <= response.status && response.status < 300) {
    if (shouldDispatch) {
      dispatch({
        type: actionType,
        payload: json,
      });
    }
    return json;
  }
}
