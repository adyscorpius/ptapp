import * as React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Tile, MyText } from "../../components";
import { colors, styles } from "../../styles";

export const BalancesTile = (
  balance,
  TotalCurrentValue,
  TotalPendingValue,
  balanceUSD,
  TotalCurrentValueUSD,
  TotalPendingValueUSD,
  market
) => {
  let range = {
    min: balance * 0.9,
    max: Math.max(TotalCurrentValue, TotalPendingValue)
  };

  let normalRange = {
    min: 0,
    max: 1,
    balance: balance / range.max,
    tcv: (TotalCurrentValue - balance) / range.max,
    tpv: (TotalPendingValue - TotalCurrentValue) / range.max
  };

  return (
    <LinearGradient
      colors={[colors.lightBackgroundColor, colors.darkBackgroundColor]}
      start={
        { x: 0.0, y: 0.0 } //['#1d1981', '#100e3e']
      }
      end={{ x: 0.3, y: 0.4 }}
      style={{ margin: 4, borderRadius: 5, elevation: 2 }}
    >
      <MyText style={{ paddingTop: 10, paddingLeft: 10 }} type="tileHeader">
        Balances
      </MyText>
      <View style={{ flexDirection: "row", borderRadius: 10, width: "100%" }}>
        <View
          style={{
            flex: normalRange.balance,
            elevation: 2,
            backgroundColor: "white",
            height: 5
          }}
        />
        <View
          style={{
            flex: normalRange.tcv,
            elevation: 2,
            backgroundColor: colors.purple,
            height: 5
          }}
        />
        <View
          style={{
            flex: normalRange.tpv,
            elevation: 2,
            backgroundColor: colors.green,
            height: 5
          }}
        />
      </View>

      <View style={styles.tilesRow}>
        <Tile
          title="Unused"
          titleStyle={{ color: "white" }}
          text={`${balance} ${market}`}
          subTitle={`$ ${balanceUSD}`}
        >
          {" "}
        </Tile>
        <Tile
          title="Current Value"
          titleStyle={{ color: colors.purple }}
          text={`${TotalCurrentValue} ${market}`}
          subTitle={`$ ${TotalCurrentValueUSD}`}
          subTitleStyle={{ fontFamily: "Oswald" }}
        />
        <Tile
          title="Pending Value"
          titleStyle={{ color: colors.green }}
          text={`${TotalPendingValue} ${market}`}
          subTitle={`$ ${TotalPendingValueUSD}`}
        >
          {" "}
        </Tile>
      </View>
    </LinearGradient>
  );
};
