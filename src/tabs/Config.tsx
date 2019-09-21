import * as React from "react";
import { ScrollView } from "react-native";
import { MyText } from "../components";

import { styles, colors } from "../styles";

class Config extends React.Component<object, object> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <MyText type="H1">Config</MyText>
      </ScrollView>
    );
  }
}

export default Config;
