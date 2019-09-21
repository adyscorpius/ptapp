const initialState = {
  data: {},
  dataReceived: false,
  login_error: "",
  loggedIn: false,
  connectionType: "",
  url: "",
  errorMessage: "",
  port: "",
  password: "",
  cookies: {},
  buyLength: 0,
  pairsLength: 0,
  pairsProfit: 0.0,
  pairsCost: 0,
  configStatus: false,
  ticker_data: []
};

export const ptReducer = (state = initialState, action) => {
  const {
    cookies,
    loggingIn,
    loggedIn,
    data,
    connectionType,
    url,
    port,
    password,
    login_error,
    buyLength,
    pairsLength,
    pairsProfit,
    pairsCost,
    dcaLength,
    dcaProfit,
    dcaCost,
    dataReceived,
    pendingLength,
    pendingCurrent,
    pendingTarget,
    market,
    ticker_data,
    errorMessage,
    user,
    uid,
    syncDate,
    configStatus,
    tradingConfig,
    baseConfig,
    dcaConfig,
    indicatorsConfig,

  } = action;
  switch (action.type) {
    case "RESET_LOGIN":
      return {
        ...state,
        loggingIn
      };
    case "REQUEST_LOGIN_BEGIN": // Start request for login to PT Server
      return {
        ...state,
        connectionType,
        url,
        port,
        password,
        loggedIn,
        dataReceived,
        loggingIn
      };
    case "LOGIN_SUCCESS": // Save cookie from result
      return { ...state, cookies, loggedIn, loggingIn };
    case "LOGIN_FAILURE": // Report Login Error to user and to analytics later.
      return { ...state, login_error, loggingIn };
    case "SESSION_EXPIRED":
      return { ...state, loggedIn, dataReceived };
    case "REQUEST_DATA_NOT_RECEIVED":
      return { ...state, dataReceived };
    case "REQUEST_MONITORING":
      return state;
    case "REQUEST_MONITORING_SUCCESS": // Save monitoring result to store
      return {
        ...state,
        data,
        dataReceived,
        buyLength,
        pairsLength,
        pairsProfit,
        pairsCost,
        dcaLength,
        dcaProfit,
        dcaCost,
        pendingLength,
        pendingCurrent,
        pendingTarget,
        configStatus,
        market
      };
    case "REQUEST_MONITORING_FAILURE":
      return state;
    case "UPDATE_TICKER_DATA":
      return {
        ...state,
        ticker_data
      };
    case "BINANCE_API_ONLINE":
      return {
        ...state,
        binanceApi: true,
        errorMessage: ""
      };
    case "BINANCE_API_OFFLINE":
      return {
        ...state,
        binanceApi: false,
        errorMessage: errorMessage
      };
    case "RECEIVED_CONFIG_SUCCCESSFUL":
      return {
        ...state,
        syncDate,
        tradingConfig,
        baseConfig,
        dcaConfig,
        indicatorsConfig
      }
    case "CONFIGS_PROCESSED":
      return {
        ...state,
        configsProcessed: true
      }
    case "USER_UPDATED":
      return {
        ...state,
        user,
        uid
      };
    default:
      return state;
  }
};
