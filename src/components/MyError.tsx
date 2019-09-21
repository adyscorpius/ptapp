import * as React from "react";
import { View, Text } from "react-native";

interface Props {
  text: string;
  error?: boolean;
  warn?: boolean;
}

const MyError = (props: Props) => {
  var styleGroup;
  if (props.error) {
    styleGroup = {
      borderWidth: 1,
      borderColor: "#d32f2f",
      backgroundColor: "#ffcdd2"
    };
  } else if (props.warn) {
    styleGroup = {
      borderWidth: 1,
      borderColor: "#ffb300",
      backgroundColor: "#ffecb3"
    };
  } else {
    styleGroup = {
      borderWidth: 1,
      borderColor: "#757575",
      backgroundColor: "#eeeeee"
    };
  }
  return (
    <View style={styleGroup}>
      <Text>{props.text}</Text>
    </View>
  );
};

export default MyError;
