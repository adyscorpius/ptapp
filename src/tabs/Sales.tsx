import * as React from "react";
import {
  View,
  FlatList,
  ScrollView,
  Dimensions,
  SectionList,
  Text
} from "react-native";
import { MyText } from "../components";
import { connect } from "react-redux";
import firebase from 'react-native-firebase'
import { rateViewStyle } from "../common/RateView";

import { styles } from "../styles";

interface Props {
  data: any;
}

class Sales extends React.PureComponent<Props, object> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('Sales', 'Sales');

  }

  //sectionData = logData => {};

  _renderItem = ({ item }) => {
    var { market, BTCUSDTPrice, ETHUSDTPrice } = this.props.data;
    let basePrice = this.props.data[market + "USDTPrice"];
    var { height, width } = Dimensions.get("window");

    let buyValue = item.soldAmount * item.averageCalculator.avgPrice;
    let soldValue = item.soldAmount * item.currentPrice;
    soldValue = soldValue * (1 - item.averageCalculator.fee / 100);
    let profit = soldValue - buyValue;
    let profitUSD = profit * basePrice;

    width = width - 20;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255, 255, 255, 0.3)"
        }}
      >
        <View style={[{ width: width * 0.32, flexDirection: "column" }]}>
          <MyText style={{ fontWeight: "bold" }}>
            {`${item.market.slice(0, -3)} (${item.boughtTimes})`}
          </MyText>
          <MyText style={{ color: 'grey' }}>{`${profit.toFixed(
            5
          )} ${market}`}</MyText>
        </View>
        <MyText style={{ width: width * 0.24, textAlign: "center" }}>
          {item.sellStrategy}
        </MyText>
        <View style={[{ width: width * 0.22, flexDirection: "column" }]}>
          <MyText style={{ textAlign: "right" }}>
            <Text style={{ fontWeight: 'bold' }}>
              S:
            </Text>
            {` ${soldValue.toFixed(5)}`}
          </MyText>
          <MyText style={{ color: "grey", textAlign: "right" }}>
            <Text style={{ fontWeight: 'bold' }}>
              B:
            </Text>
            {` ${buyValue.toFixed(5)}`}
          </MyText>
        </View>
        <View style={[{ width: width * 0.22, flexDirection: "column" }]}>
          <MyText
            style={[
              rateViewStyle(item.profit, "text"),
              { flex: 1, textAlign: "right" }
            ]}
          >
            {item.profit.toFixed(2) + "%"}
          </MyText>
          <MyText
            style={[
              rateViewStyle(item.profit, "text"),
              { color: "grey", flex: 1, textAlign: "right" }
            ]}
          >
            {`$ ${profitUSD.toFixed(2)}`}
          </MyText>
        </View>
      </View>
    );
  };

  _keyExtractor = (item, index) => {
    return index;
  };

  render() {
    var { height, width } = Dimensions.get("window");
    width = width - 20;
    const { sellLogData } = this.props.data;

    return (
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 30, borderRadius: 5, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.6)",
              margin: 0
            }}
          >
            <MyText
              style={{
                width: width * 0.32,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              PAIR
            </MyText>
            <MyText
              style={{
                width: width * 0.24,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              STRATEGY
            </MyText>
            <MyText
              style={{
                width: width * 0.22,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              VALUE
            </MyText>
            <View>
              <MyText
                style={{
                  width: width * 0.22,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                PROFIT
              </MyText>
            </View>
          </View>
          <FlatList
            inverted
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            data={sellLogData}
            ListEmptyComponent={() => (
              <MyText style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                No Sales Logged
              </MyText>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ ptReducer }) => {
  const { data } = ptReducer;
  return {
    data
  };
};

export default connect(mapStateToProps, null)(Sales);
