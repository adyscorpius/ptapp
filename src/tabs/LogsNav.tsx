import * as React from "react";
import { TabNavigator } from "react-navigation";
import { Dimensions } from "react-native";
import { Pairs, DCA, Sales, PendingLog, PossibleBuy } from "./index";

//import Pairs from './Pairs'
import { colors } from "../styles";

const { width } = Dimensions.get("window");

const LogsNav = TabNavigator(
  {
    Pairs: {
      screen: Pairs,
      navigationOptions: () => ({
        title: "Pairs"
      })
    },
    DCA: {
      screen: DCA,
      navigationOptions: () => ({
        title: "DCA"
      })
    },
    Sales: {
      screen: Sales,
      navigationOptions: () => ({
        title: "Sales"
      })
    },
    Buy: {
      screen: PossibleBuy,
      navigationOptions: () => ({
        title: "PBL"
      })
    }
    /* PendingLog: {
      screen: PendingLog,
      navigationOptions: {
        title: "Pending"
      }
    } */
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: 10
      },
      showIcon: false,
      style: {
        backgroundColor: "#39404b"
      },
      activeTintColor: "#fac037"
    },
    animationEnabled: true,
    tabBarPosition: "top"
    //lazy: true,
  }
);

export default LogsNav;
