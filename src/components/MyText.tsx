import * as React from "react";
import { Text } from "react-native";
import { styles } from "../styles";

interface Props {
  readonly children?: any;
  readonly type?: string;
  readonly font?: string;
  readonly size?: number;
  readonly style?: any;
  readonly padding?: boolean;
  readonly onPress?: any;
}

class MyText extends React.Component<Props, object> {
  constructor(props) {
    super(props);
  }

  isPadding = () => {
    if (this.props.padding)
      return { paddingTop: 10, paddingBottom: 10, paddingHorizontal: 10 };

    return {};
  };

  render() {
    let { type, children, padding } = this.props;
    let selectedStyle;
    switch (type) {
      case "H1":
        selectedStyle = styles.headingTextStyle;
        break;
      case "tileHeader":
        selectedStyle = styles.TilesHeaderStyle;
        break;
      case "button":
        selectedStyle = styles.buttonTextStyle;
        break;
      default:
        selectedStyle = styles.defaultTextStyle;
        break;
    }

    return (
      <Text
        style={[selectedStyle, this.props.style, this.isPadding()]}
        onPress={() => this.props.onPress}
      >
        {children}
      </Text>
    );
  }
}

export default MyText;
