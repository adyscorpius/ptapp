import * as React from "react";
import { View } from "react-native";

import { styles } from "../styles";
import { MyText } from "../components";

interface Props {
  title: string;
  subTitle: string;
  text: string | "";
  titleStyle?: any;
  subTitleStyle?: any;
  textStyle?: any;
}

class Tile extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.tiles}>
        <MyText style={[styles.tilesTitleText, this.props.titleStyle]}>
          {this.props.title}
        </MyText>
        <MyText style={[styles.tilesSubText, this.props.subTitleStyle]}>
          {this.props.subTitle}
        </MyText>
        <MyText style={[styles.tilesText, this.props.textStyle]}>
          {this.props.text}
        </MyText>
      </View>
    );
  }
}

export default Tile;
