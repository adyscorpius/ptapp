import * as React from "react";
import { TabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
//import { Dimensions } from 'react-native'

import {
  Monitor,
  Settings,
  Pairs,
  DCA,
  Sales,
  PendingLog,
  PossibleBuy,
  LogsNav
} from "./tabs";
import { colors } from "./styles";

//const { width } = Dimensions.get('window');

const Navigation = TabNavigator(
  {
    Monitor: {
      screen: Monitor,
      navigationOptions: {
        tabBarLabel: "Monitor",
        tabBarIcon: ({ tintColor, focused }) => {
          <Icon
            name={focused ? "ios-laptop" : "ios-laptop-outline"}
            size={26}
            style={{ color: tintColor }}
          />;
        }
      }
    },
    Logs: {
      screen: LogsNav,
      navigationOptions: {
        tabBarLabel: "Logs",
        tabBarIcon: ({ tintColor, focused }) => {
          <Icon
            name={focused ? "ios-bookmarks" : "ios-bookmarks-outline"}
            size={26}
            style={{ color: tintColor }}
          />;
        }
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor, focused }) => {
          <Icon
            name={focused ? "ios-settings" : "ios-settings-outline"}
            size={26}
            style={{ color: tintColor }}
          />;
        }
      }
    }
  },
  {
    swipeEnabled: false,
    tabBarOptions: {
      indicatorStyle: { backgroundColor: "#FDD835" },
      showIcon: false,
      style: {
        backgroundColor: "#39404b"
      },
      labelStyle: {
        fontSize: 10,
        fontWeight: "bold",
        fontFamily: "Lato-Black"
      },
      activeTintColor: "#fac037"
    },
    animationEnabled: false,
    tabBarPosition: "bottom"
    //lazy: true,
  }
);

export default Navigation;
