import * as React from "react";
import { View, ScrollView, FlatList, Dimensions } from "react-native";
import { MyText } from "../components";
import { connect } from "react-redux";
import firebase from 'react-native-firebase'
import { styles } from "../styles";
import { rateViewStyle } from "../common/RateView";

interface Props {
  data: any;
  dataReceived: boolean;
}

class Pairs extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('PairsLog', 'PairsLog');
    //__DEV__ && console.log(this.props.data.gainLogData);
  }

  componentWillReceiveProps() { }

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
        <MyText padding style={{ width: width * 0.28, fontWeight: "bold" }}>
          {item.market.slice(0, -3)}
        </MyText>
        <MyText padding style={{ width: width * 0.28, textAlign: "center" }}>
          {item.sellStrategy}
        </MyText>
        <MyText padding style={{ width: width * 0.22, textAlign: "right" }}>
          {item.triggerValue.toFixed(2)}
        </MyText>
        <View>
          <MyText
            padding
            style={[
              rateViewStyle(item.profit, "text"),
              { width: width * 0.22, textAlign: "right" }
            ]}
          >
            {item.profit.toFixed(2) + "%"}
          </MyText>
        </View>
      </View>
    );
  };

  _keyExtractor = item => {
    return item.market;
  };

  render() {
    var { height, width } = Dimensions.get("window");
    width = width - 20;
    return (
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 10, borderRadius: 5, flex: 1 }}>
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
              TRIGGER
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
            data={this.props.data.gainLogData.concat(
              this.props.data.watchModeLogData
            )}
            ListEmptyComponent={() => (
              <MyText style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                No Pairs
              </MyText>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { data, dataReceived } = state.ptReducer;
  return { data, dataReceived };
};

export default connect(mapStateToProps, null)(Pairs);
