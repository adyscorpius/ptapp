import * as React from "react";
import { View, FlatList, ScrollView, Dimensions } from "react-native";
import { MyText } from "../components";
import { connect } from "react-redux";
import firebase from 'react-native-firebase'
import { rateViewStyle } from "../common/RateView";

import { styles } from "../styles";

interface Props {
  data: any;
}

class PossibleBuy extends React.PureComponent<Props, object> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('PBL', 'PBL');
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
        <MyText padding style={{ width: width * 0.28, fontWeight: "bold" }}>
          {`${item.market}`}
        </MyText>
        <MyText padding style={{ width: width * 0.28, textAlign: "center" }}>
          {`${item.buyStrategy}`}
        </MyText>
        <MyText padding style={{ width: width * 0.22, textAlign: "right" }}>
          {item.currentValue.toFixed(2)}
        </MyText>
        <MyText
          padding
          style={[
            rateViewStyle(item.profit, "text"),
            { width: width * 0.22, textAlign: "right" }
          ]}
        >
          {item.triggerValue.toFixed(2)}
        </MyText>
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
        <View style={{ paddingBottom: 20, borderRadius: 5, flex: 1 }}>
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
              CURRENT
            </MyText>
            <View>
              <MyText
                style={{
                  width: width * 0.22,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                TRIGGER
              </MyText>
            </View>
          </View>
          <FlatList
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            data={this.props.data.bbBuyLogData}
            ListEmptyComponent={() => (
              <MyText style={{ padding: 10, flex: 1, alignSelf: "center" }}>
                No Possible Buy Pairs
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

export default connect(mapStateToProps, null)(PossibleBuy);
