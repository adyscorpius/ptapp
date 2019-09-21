import * as React from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
  InteractionManager,
  View,
  Text
} from "react-native";
import Navigation from "./navigation";

import { request_data, getTickerData, anonymous_login, request_config_status } from "./actions";
import { Settings } from "./tabs/index";
import { styles } from "./styles";
import firebase from "react-native-firebase";

interface Props {
  request_data;
  loggedIn;
  dataReceived;
  getTickerData;
  anonymous_login;
  user;
  uid;
  request_config_status;
  configStatus;
}

class MainComponent extends React.PureComponent<Props> {
  ref;

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.anonymous_login();
    if (this.props.user && this.props.configStatus) {
      firebase.analytics().logEvent('ConfigRequestTriggered', { user: this.props.user })
      this.props.request_config_status();
    }
  }

  componentDidCatch(error, info) {
    __DEV__ && console.log(error, info);
  }

  render() {
    if (this.props.dataReceived) {
      return <Navigation />;
    }

    if (!this.props.loggedIn) return <Settings />;

    return (
      <View
        style={[
          styles.container,
          {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }
        ]}
      >
        <ActivityIndicator size="large" />
        <Text
          style={{ color: "white", textAlign: "center", paddingVertical: 10 }}
        >
          {this.props.dataReceived ? "Data Received" : "Fetching data..."}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { dataReceived, loggedIn, user, uid, configStatus } = state.ptReducer;
  return {
    dataReceived,
    loggedIn,
    user,
    uid,
    configStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    request_data: () => dispatch(request_data()),
    anonymous_login: () => dispatch(anonymous_login()),
    getTickerData: () => dispatch(getTickerData()),
    request_config_status: () => dispatch(request_config_status())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
