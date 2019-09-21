import * as CookieManager from "react-native-cookies";
import {
  binance_api,
  ticker_api,
  login_uri,
  data_uri,
  actions
} from "../constants";
import firebase from "react-native-firebase";
import configureStore from "../configureStore";
import axios from 'axios';
import * as moment from 'moment';

/**
 * API Call for Monitoring Data Request
 *
 */
export function request_data() {
  return async (dispatch, getState) => {
    const {
      REQUEST_MONITORING,
      REQUEST_MONITORING_SUCCESS,
      REQUEST_MONITORING_FAILURE,
      SESSION_EXPIRED
    } = actions;
    var { connectionType, url, port } = getState().ptReducer;
    var { dataURL } = defineURLs(connectionType, url, port);
    dispatch({ type: REQUEST_MONITORING });
    try {
      let response = await fetch(dataURL, {
        method: "GET",
        headers: {
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36",
          accept: "application/json",
          dnt: "1",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache"
        },
        credentials: "include"
      });
      if (
        response.headers["map"]["content-type"][0] !==
        "application/json;charset=UTF-8"
      )
        throw new Error("session-expired");
      let data = await response.json();

      let buyLength: number = 0,
        buyCost: number = 0,
        buyProfit: number = 0;
      let pairsLength: number = 0,
        pairsCost: number = 0,
        pairsCurrent: number = 0,
        pairsProfit: number = 0;
      let dcaLength: number = 0,
        dcaCost: number = 0,
        dcaCurrent: number = 0,
        dcaProfit: number = 0;
      let pendingLength: number = 0,
        pendingTarget: number = 0,
        pendingCurrent: number = 0,
        pendingProfit: number = 0;
      let market = data.market;
      buyLength = data.bbBuyLogData ? data.bbBuyLogData.length : 0;

      // Pairs Parameters
      pairsLength = data.gainLogData ? data.gainLogData.length : 0;

      // Pairs Setup
      pairsCost = data.totalPairsRealCost;
      pairsCurrent = data.totalPairsCurrentValue;
      pairsProfit = pairsCost != 0 ? (pairsCurrent - pairsCost) / pairsCost : 0;

      // DCA Setup
      dcaLength = data.dcaLogData ? data.dcaLogData.length : 0;
      dcaCost = data.totalDCARealCost;
      dcaCurrent = data.totalDCACurrentValue;
      dcaProfit = dcaCost != 0 ? (dcaCurrent - dcaCost) / dcaCost : 0;

      pendingLength = data.pendingLogData ? data.pendingLogData.length : 0;
      pendingTarget = data.totalPendingTargetPrice;
      pendingCurrent = data.totalPendingCurrentValue;

      let configStatus: boolean = data.settings.enableConfig;

      dispatch({
        type: REQUEST_MONITORING_SUCCESS,
        data,
        buyLength,
        market,
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
        dataReceived: true
      });
    } catch (e) {
      if (e.message === "session-expired") {
        console.log(e.message);
        dispatch({
          type: SESSION_EXPIRED,
          loggedIn: false,
          dataReceived: false
        });
      }

      dispatch({
        type: REQUEST_MONITORING_FAILURE,
        error: e.message
      });
    }
  };
}


/**
 * Check if config is enabled and correctly configured 
 */
export function request_config_status() {
  return async (dispatch, getState) => {
    let { connectionType, url, port, user, tradingConfig, baseConfig, dcaConfig, indicatorsConfig, data, syncDate } = await getState().ptReducer;
    //console.log('Running Config Check');
    if (url.length < 5) return; // Don't run the function if not logged in.
    /* let now = moment(new Date());
    if (syncDate && now.diff(syncDate, 'days') < 1) return; */

    let basePath = `${connectionType}://${url}:${port}/settings/load?fileName=`
    let tradingURL = `${basePath}trading%2FPAIRS.properties`
    let configURL = `${basePath}configuration.properties`
    let dcaURL = `${basePath}trading%2FDCA.properties`
    let indicatorsURL = `${basePath}trading%2FINDICATORS.properties`

    //console.log(tradingURL, configURL, dcaURL, indicatorsURL);
    const now = moment(new Date());

    try {
      let newTradingConfig = await axios.get(tradingURL);
      let newBaseConfig = await axios.get(configURL);
      let newDcaConfig = await axios.get(dcaURL);
      let newIndicatorsConfig = await axios.get(indicatorsURL);
      if (newTradingConfig.data === tradingConfig && newBaseConfig === baseConfig && newDcaConfig.data === dcaConfig && newIndicatorsConfig.data === indicatorsConfig) {
        console.log('Same data. Not saving.')
        return;
      }


      dispatch({
        type: 'RECEIVED_CONFIG_SUCCCESSFUL',
        tradingConfig: newTradingConfig.data,
        baseConfig: newBaseConfig.data,
        dcaConfig: newDcaConfig.data,
        indicatorsConfig: newIndicatorsConfig.data,
        syncDate: now
      });

      const defaultStorage = firebase.storage()

      if (now.diff(syncDate, "days") < 1 && syncDate) {
        firebase.analytics().logEvent('ConfigTriggerFailed', { syncDate, now })
        return;
      }
      const storagePath = firebase
        .database()
        .ref(user.user.uid + '/' + now)

      storagePath.update({
        trading: newTradingConfig.data,
        base: newBaseConfig.data,
        dca: newDcaConfig.data,
        indicators: newIndicatorsConfig.data,
        data: data
      }).then(() => {
        firebase.analytics().logEvent('ConfigTriggerSuccessful')
        dispatch({ type: 'CONFIGS_PROCESSED' })
      })
    } catch (e) {
      firebase.analytics().logEvent('ConfigTriggerFailed', { error: e.message })
      console.log(e.message);
    }



  }
}

/**
 * Login Request function
 * @param connectionType
 * @param url
 * @param port
 * @param password
 */
export function request_login(
  connectionType: "http" | "https",
  url: string,
  port: string,
  password: string
) {
  return async dispatch => {
    const { REQUEST_LOGIN_BEGIN, LOGIN_FAILURE } = actions;
    // Create request structured body for application/x-www-urlencoded
    const searchParams = createParams(password);

    // Create URLs from data received
    var { fetchURL, origin, referer } = defineURLs(connectionType, url, port);

    // Create headers for login request.
    const headers = {
      origin: origin,
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36",
      "content-type": "application/x-www-form-urlencoded",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      dnt: "1",
      referer: referer,
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache"
    };
    firebase.analytics().logEvent('UserLoginStarted')
    dispatch({
      type: REQUEST_LOGIN_BEGIN,
      connectionType,
      url,
      port,
      password,
      loggedIn: false,
      dataReceived: false,
      loggingIn: true
    });

    try {
      let request = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: searchParams
      });
      firebase.analytics().logEvent('UserLoginSuccessful')
      dispatch(requestCookie(origin));
    } catch (e) {
      firebase.analytics().logEvent('UserLoginFailed', { error: e.message })
      dispatch({
        type: LOGIN_FAILURE,
        login_error: e.message,
        loggingIn: false
      });
    }
  };
}

export function reset_login() {
  const { RESET_LOGIN, REQUEST_DATA_NOT_RECEIVED } = actions;
  CookieManager.clearAll(); // Reset all Cookies.
  firebase.analytics().logEvent('FormResetInitiated');
  return {
    type: RESET_LOGIN,
    loggingIn: false,
    data: {},
    dataReceived: false,
    login_error: "",
    loggedIn: false,
    connectionType: "",
    url: "",
    port: "",
    password: "",
    cookies: {}
  };
}
export function setDataNotReceived() {
  const { REQUEST_DATA_NOT_RECEIVED } = actions;
  return {
    type: REQUEST_DATA_NOT_RECEIVED,
    dataReceived: false
  };
}

/**
 * Create URLS from data entered by user
 * The function checks for port value and creates the request URL, origin and referer for headers
 **/
function defineURLs(connectionType: string, url: string, port: string) {
  var fetchURL: string;
  var origin: string;
  var referer: string;
  var dataURL: string;

  if (
    (connectionType === "http" && port === "80") ||
    (connectionType === "https" && port === "443")
  ) {
    origin = `${connectionType}://${url}`; // https://demo.profittrailer.io
    fetchURL = `${origin}${login_uri}`; // https://demo.profittrailer.io/login
    dataURL = `${origin}${data_uri}`; // https://demo.profittrailer.io/monitoring/data
    referer = `${origin}${login_uri}`; // https://demo.profittrailer.io/login
  } else {
    origin = `${connectionType}://${url}`; // https://demo.profittrailer.io
    fetchURL = `${origin}:${port}${login_uri}`; // https://demo.profittrailer.io:8443/login
    dataURL = `${origin}:${port}${data_uri}`; // https://demo.profittrailer.io:8443/monitoring/data
    referer = `${origin}:${port}${login_uri}`; // https://demo.profittrailer.io:8443/login
  }

  return { fetchURL, origin, referer, dataURL };
}

/**
 *  Create request params from password received for Content-Type x-www-form-urlencoded
 * { password: 'PASSWORD' } becomes password=PASSWORD
 */
function createParams(password: string) {
  const params = { password };
  const searchParams = Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
  return searchParams;
}

export function requestCookie(origin: string) {
  const { LOGIN_FAILURE, LOGIN_SUCCESS } = actions;
  return async dispatch => {
    try {
      let cookies = await CookieManager.get(origin);
      dispatch({
        type: LOGIN_SUCCESS,
        cookies,
        loggedIn: true,
        loggingIn: false
      });
      dispatch(request_data());
      dispatch(request_config_status());
    } catch (login_error) {
      firebase.analytics().logEvent('FailedGetCookies', { error: login_error.message })
      dispatch({ type: LOGIN_FAILURE, login_error, loggingIn: false });
    }
  };
}

export const test_binance = () => {
  const { BINANCE_API_OFFLINE, BINANCE_API_ONLINE } = actions;
  return async dispatch => {
    try {
      let response = await fetch(binance_api);
      let json = await response.json();
      if (json.status == "0") {
        firebase.analytics().logEvent('BinanceAPIOnline', { status: json.status, message: json.msg })
        dispatch({ type: BINANCE_API_ONLINE });
      } else {
        firebase.analytics().logEvent('BinanceAPIOffline', { status: json.status, message: json.msg })
        dispatch({ type: BINANCE_API_OFFLINE, errorMessage: json.msg });
      }
    } catch (e) {
      firebase.analytics().logEvent('BinanceAPITestError', { error: e.message })
      dispatch({ type: BINANCE_API_OFFLINE, errorMessage: e.message });
    }
  };
};

export const getTickerData = () => {
  const { UPDATE_TICKER_DATA } = actions;
  return async dispatch => {
    try {
      let response = await fetch(ticker_api);
      let ticker_data = await response.json();
      dispatch({
        type: UPDATE_TICKER_DATA,
        ticker_data
      });
    } catch (error) {
      firebase.analytics().logEvent('FailedTickerData', { error: error.message })
      //console.log(error);
    }
  };
};

export const anonymous_login = () => {
  return async dispatch => {
    try {
      let user = await firebase.auth().signInAnonymouslyAndRetrieveData();
      let uid = user.user.uid;
      firebase.analytics().logEvent('UserLoginSuccessful', { uid })
      dispatch({
        type: "USER_UPDATED",
        user,
        uid
      });
    } catch (e) {
      firebase.analytics().logEvent('UserLoginFailed', { error: e.message });
    }
  };
};
