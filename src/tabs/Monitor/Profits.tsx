import * as React from "react";
import { styles, colors } from "../../styles";
import { View } from "react-native";
import { MyText, Tile } from "../../components";
import { rateViewStyle } from "../../common/RateView";
import LinearGradient from "react-native-linear-gradient";

export const ProfitsTile = (
  profitToday,
  profitYesterday,
  profitWeek,
  profitTodayUSD,
  profitYesterdayUSD,
  profitWeekUSD,
  market
) => {
  return (
    <LinearGradient
      colors={[colors.lightBackgroundColor, colors.darkBackgroundColor]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.3, y: 0.4 }}
      style={{ margin: 4, borderRadius: 5 }}
    >
      <MyText style={{ paddingTop: 10, paddingLeft: 10 }} type="tileHeader">
        Profit
      </MyText>
      <View style={styles.tilesRow}>
        <Tile
          title="Today"
          text={`${profitToday} ${market}`}
          subTitleStyle={rateViewStyle(profitToday, "text")}
          subTitle={`$ ${profitTodayUSD}`}
        />
        <Tile
          title="Yesterday"
          text={`${profitYesterday} ${market}`}
          subTitleStyle={rateViewStyle(profitYesterday, "text")}
          subTitle={`$ ${profitYesterdayUSD}`}
        />
        <Tile
          title="Last Week"
          text={`${profitWeek} ${market}`}
          subTitleStyle={rateViewStyle(profitWeek, "text")}
          subTitle={`$ ${profitWeekUSD}`}
        />
      </View>
    </LinearGradient>
  );
};
