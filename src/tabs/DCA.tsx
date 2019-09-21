import * as React from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback
} from "react-native";
import { MyText } from "../components";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { rateViewStyle } from "../common/RateView";
import firebase from 'react-native-firebase'
import { styles } from "../styles";

interface Props {
  data: any;
}

interface State {
  expanded: boolean;
}

class DCA extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('DCA', 'DCA');
  }

  _renderItem = ({ item }) => {
    var { height, width } = Dimensions.get("window");
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
        <MyText style={{ width: width * 0.28, fontWeight: "bold" }}>
          {`${item.market.slice(0, -3)} (${item.boughtTimes})`}
        </MyText>
        <View
          style={[{ width: width * 0.28, flexDirection: "column" }]}
        >
          <MyText style={{ flex: 1, textAlign: "right", marginRight: 5 }}>
            {item.sellStrategy}
          </MyText>
          <MyText
            style={[
              { color: "grey", flex: 1, textAlign: "right", marginRight: 5 }
            ]}
          >
            {item.buyStrategy}
          </MyText>
        </View>
        <View
          style={[{ width: width * 0.22, flexDirection: "column" }]}
        >
          <MyText
            style={{
              color: "white",
              flex: 1,
              textAlign: "right",
              marginRight: 5
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>C:</Text>
            {` ${(item.averageCalculator.totalAmount * item.currentPrice).toFixed(
              5
            )}`}
          </MyText>
          <MyText
            style={[
              { color: "grey", flex: 1, textAlign: "right", marginRight: 5 }
            ]}
          >
            <Text style={{ fontWeight: 'bold' }}>B:</Text>
            {` ${item.averageCalculator.avgCost.toFixed(5)}`}
          </MyText>
        </View>
        <View style={[{ width: width * 0.22, flexDirection: "column" }]}>
          <MyText
            style={[
              rateViewStyle(item.profit, "text"),
              {
                flex: 1,
                textAlign: "right",
                fontWeight: "bold",
                marginRight: 5
              }
            ]}
          >
            {item.profit.toFixed(2) + "%"}
          </MyText>
          <MyText
            style={[
              { color: "grey", flex: 1, textAlign: "right", marginRight: 5 }
            ]}
          >
            {"~$ " + item.buyProfit.toFixed(2)}
          </MyText>
        </View>
      </View>
    );
  };

  _keyExtractor = item => {
    return item.market;
  };

  _getItemLayout = (data, index) => ({
    length: 40,
    offset: 40 * index,
    index
  });

  _expand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    var { height, width } = Dimensions.get("window");
    width = width - 20;
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
                width: width * 0.28,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              PAIR
            </MyText>
            <MyText
              style={{
                width: width * 0.28,
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
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            data={this.props.data.dcaLogData}
            getItemLayout={this._getItemLayout}
            ListEmptyComponent={() => (
              <MyText style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                No DCA Pairs
              </MyText>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.ptReducer;
  return {
    data
  };
};

export default connect(mapStateToProps, null)(DCA);
