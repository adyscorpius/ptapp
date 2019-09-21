import * as React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from 'react-native-firebase'
var MessageBarAlert = require("react-native-message-bar").MessageBar;
//var MessageBarManager = require('react-native-message-bar').MessageBarManager;

import { MyText, Tile } from "../../components";
import { styles, colors } from "../../styles";
import { test_binance, setDataNotReceived, request_data } from "../../actions";

import { StatusTile } from "./Status";
import { ProfitsTile } from "./Profits";
import { BalancesTile } from "./Balances";
import { LogsTile } from "./Logs";

import { preciseRound } from "../../common/preciseRound";
import { rateViewStyle } from "../../common/RateView";

interface Props {
  data: any;
  dataReceived: boolean;
  binanceApi: boolean;
  test_binance: any;
  request_data: any;
  loggedIn: boolean;
}

interface State {
  tickerColor: string;
}

class Monitor extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      tickerColor: "white"
    };
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('Monitor', 'Monitor')
    if (this.props.loggedIn) {
      setInterval(() => {
        this.props.request_data();
        this.props.test_binance();
      }, 5000);
    }
  }

  convertUSD = (value): string => {
    const USDValue =
      parseFloat(value) * parseFloat(this.props.data.BTCUSDTPrice);
    return USDValue.toString();
  };

  showAlert = () => {
    this.props.test_binance();
    console.log(this.props.binanceApi);
    const apiAlive = {
      title: "API Online",
      message: "Binance appears to be working fine.",
      alertType: "success"
      // See Properties section for full customization
      // Or check `index.ios.js` or `index.android.js` for a complete example
    };

    const apiDead = {
      title: "API Down",
      message: "Binance API isn't working fine.",
      alertType: "error"
    };
    //this.props.binanceApi ? MessageBarManager.showAlert(apiAlive) : MessageBarManager.showAlert(apiDead)
  };

  render() {
    const { data, dataReceived, binanceApi } = this.props;
    const market = data.market;
    const header = data.sitename;

    const profitToday = preciseRound(parseFloat(data.totalProfitToday), 4);
    const profitYesterday = preciseRound(
      parseFloat(data.totalProfitYesterday),
      4
    );
    const profitWeek = preciseRound(parseFloat(data.totalProfitWeek), 4);
    const BTCPrice = preciseRound(data.BTCUSDTPrice, 2);
    const ETHPrice =
      market === "ETH" && data.ETHUSDTPrice
        ? preciseRound(data.ETHUSDTPrice, 2)
        : 0;
    const BasePrice =
      market === "ETH"
        ? preciseRound(data.ETHUSDTPrice, 5)
        : preciseRound(data.BTCUSDTPrice, 5);
    const profitTodayUSD = preciseRound(data.totalProfitToday * BasePrice, 2);
    const profitYesterdayUSD = preciseRound(
      data.totalProfitYesterday * BasePrice,
      2
    );
    const profitWeekUSD = preciseRound(data.totalProfitWeek * BasePrice, 2);
    const balance = preciseRound(data.balance, 4);
    const balanceUSD = preciseRound(balance * BasePrice, 2);
    const PairsCurrentValue = preciseRound(data.totalPairsCurrentValue, 4);
    const PairsCurrentValueUSD = preciseRound(PairsCurrentValue * BasePrice, 2);
    const TotalCurrentValue = preciseRound(
      balance +
      data.totalPairsCurrentValue +
      data.totalDCACurrentValue +
      data.totalPendingCurrentValue,
      4
    );
    const TotalCurrentValueUSD = preciseRound(TotalCurrentValue * BasePrice, 2);
    const TotalPendingValue = preciseRound(
      balance +
      data.totalPairsRealCost +
      data.totalDCARealCost +
      data.totalPendingTargetPrice,
      4
    );
    const TotalPendingValueUSD = preciseRound(TotalPendingValue * BasePrice, 2);

    const LogData = {
      pairsLength: data.gainLogData.length + data.watchModeLogData.length || 0,
      dcaLength: data.dcaLogData.length || 0,
      pendingLength: data.pendingLogData.length || 0,
      pblLength: data.bbBuyLogData.length || 0,
      pairsProfit:
        data.totalPairsRealCost != 0
          ? preciseRound(
            (data.totalPairsCurrentValue - data.totalPairsRealCost) /
            data.totalPairsRealCost *
            100,
            2
          )
          : 0,
      dcaProfit:
        data.totalDCARealCost != 0
          ? preciseRound(
            (data.totalDCACurrentValue - data.totalDCARealCost) /
            data.totalDCARealCost *
            100,
            2
          )
          : 0,
      pendingProfit:
        data.totalPendingCurrentValue != 0
          ? preciseRound(
            (data.totalPendingTargetPrice - data.totalPendingCurrentValue) /
            data.totalPendingCurrentPrice *
            100,
            2
          )
          : 0,
      conversionRate: BasePrice
    };

    return (
      <ScrollView style={styles.container}>
        {!!dataReceived ? (
          <View>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
                marginTop: 5
              }}
            >
              <MyText type="H1">{header}</MyText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                }}
              >
                <MyText
                  type="H1"
                  style={{
                    fontFamily: "Lato-Black",
                    fontSize: 18,
                    color: this.state.tickerColor
                  }}
                >
                  {`${market} $ ${preciseRound(BasePrice, 2)}`}
                </MyText>
              </View>
            </View>
            {BalancesTile(
              balance,
              TotalCurrentValue,
              TotalPendingValue,
              balanceUSD,
              TotalCurrentValueUSD,
              TotalPendingValueUSD,
              market
            )}
            {ProfitsTile(
              profitToday,
              profitYesterday,
              profitWeek,
              profitTodayUSD,
              profitYesterdayUSD,
              profitWeekUSD,
              market
            )}
            {LogsTile(LogData)}
            {StatusTile(data.settings, binanceApi, this.showAlert)}
          </View>
        ) : (
            <View />
          )}
      </ScrollView>
    );
  }
}

const ticker = (market: string) => {
  if (market === "BTC") {
    return <Icon name="bitcoin" color="#fff" size={22} />;
  }
  if (market === "ETH") {
    //return <Icon name='ethereum' color="#fff" size={22} />
  }

  return <Icon name="dollar" color="#fff" size={22} />;
};

const mapStateToProps = state => {
  const { data, dataReceived, binanceApi, loggedIn } = state.ptReducer;
  return {
    data,
    dataReceived,
    binanceApi,
    loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    test_binance: () => dispatch(test_binance()),
    request_data: () => dispatch(request_data())
    //setDataNotReceived: () => dispatch(setDataNotReceived())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
