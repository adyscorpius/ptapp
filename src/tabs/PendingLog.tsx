import * as React from "react";
import { ScrollView, View, Dimensions } from "react-native";
import { MyText } from "../components";

import { colors, styles } from "../styles";

class PendingLog extends React.PureComponent<object, object> {
  constructor(props) {
    super(props);
  }

  render() {
    var { height, width } = Dimensions.get("window");
    width = width - 20;
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(255, 255, 255, 0.6)",
            margin: 0
          }}
        >
          <MyText
            padding
            style={{
              width: width * 0.28,
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            PAIR
          </MyText>
          <MyText
            padding
            style={{
              width: width * 0.28,
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            STRATEGY
          </MyText>
          <MyText
            padding
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
              padding
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
      </ScrollView>
    );
  }
}

export default PendingLog;
