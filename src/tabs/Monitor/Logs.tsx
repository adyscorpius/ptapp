import * as React from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { Tile, MyText } from "../../components";
import { colors, styles } from "../../styles";
import { rateViewStyle } from '../../common/RateView'
export const LogsTile = LogData => {
  return (
    <LinearGradient
      colors={[colors.lightBackgroundColor, colors.darkBackgroundColor]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.3, y: 0.4 }}
      style={{ margin: 4, borderRadius: 5, elevation: 2 }}
    >
      <View>
        <MyText style={{ paddingTop: 10, paddingLeft: 10 }} type="tileHeader">
          Trades
        </MyText>
        <View style={styles.tilesRow}>
          <Tile
            title="PBL"
            text=""
            subTitle={LogData.pblLength}
            subTitleStyle={{ fontSize: 18 }}
          />
          <Tile
            title="PAIRS"
            subTitle={LogData.pairsLength}
            text={LogData.pairsProfit + " %"}
            textStyle={rateViewStyle(LogData.pairsProfit, 'text')}
            subTitleStyle={{ fontSize: 18 }}
          />
          <Tile
            title="DCA"
            text={LogData.dcaProfit + " %"}
            subTitle={LogData.dcaLength}
            textStyle={rateViewStyle(LogData.dcaProfit, 'text')}
            subTitleStyle={{ fontSize: 18 }}
          />
          <Tile
            title="Pending"
            text={LogData.pendingProfit + " %"}
            subTitle={LogData.pendingLength}
            textStyle={rateViewStyle(LogData.pendingProfit, 'text')}
            subTitleStyle={{ fontSize: 18 }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
