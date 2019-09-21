import * as React from "react";
import { Tile, MyText } from "../../components";
import { View } from "react-native";

import { colors, styles } from "../../styles";

import LinearGradient from "react-native-linear-gradient";
import { MessageBarAlert, MessageBarManager } from "react-native-message-bar";

const buttonStyle = color => {
  return {
    padding: 3,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: color
  };
};

export const StatusTile = (settings, binanceApi, showAlert) => {
  const som = settings.sellOnlyMode ? colors.red : "grey";
  const api = binanceApi ? colors.green : colors.red;
  const somo = settings.sellOnlyModeOverride ? colors.red : "grey";
  const enableConfig = settings.enableConfig ? colors.green : "grey";
  const passSet = settings.passwordSet ? colors.green : colors.red;

  return (
    <LinearGradient
      colors={[colors.lightBackgroundColor, colors.darkBackgroundColor]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.3, y: 0.4 }}
      style={{ margin: 4, borderRadius: 5, elevation: 2 }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 2,
          alignContent: "space-around"
        }}
      >
        <MyText style={buttonStyle(api)} onPress={() => showAlert()}>
          API
        </MyText>
        <MyText style={buttonStyle(som)}>SOM</MyText>
        <MyText style={buttonStyle(somo)}> SOMO</MyText>
        <MyText style={buttonStyle(enableConfig)}>CONFIG</MyText>
        <MyText style={buttonStyle(passSet)}>PASS</MyText>
      </View>
    </LinearGradient>
  );
};
