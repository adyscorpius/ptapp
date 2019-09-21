import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { MyText, MyError } from "../components";
import { styles, colors } from "../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from 'react-native-firebase';
import { request_login, request_data, reset_login } from "../actions";

import Icon from "react-native-vector-icons/Feather";

interface State {
  password: string;
  connectionType: "https" | "http";
  url: string;
  port: string;
  response: string;
  postURL: string;
  pageLoaded: boolean;
  hidePassword: boolean;
  pageError: string;
}

interface Props {
  request_login;
  request_data;
  reset_login;
  cookies: object;
  connectionType: "http" | "https";
  port: string;
  url: string;
  data: any;
  password: string;
  loggingIn: boolean;
  loggedIn: boolean;
}

class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      connectionType: "https",
      url: "",
      port: "443",
      response: "",
      postURL: "",
      pageLoaded: false,
      pageError: "",
      hidePassword: true
    };
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('Settings', 'Settings');
    this.setState({
      port: this.props.port || "443",
      url: this.props.url,
      password: this.props.password,
      connectionType: this.props.connectionType || "https"
    });
  }

  setHttpConnectionType = () => {
    this.setState({ connectionType: "http", port: "80" });
  };

  setHttpsConnectionType = () => {
    this.setState({ connectionType: "https", port: "443" });
  };

  onChangeURL = (url: string) => this.setState({ url: url.trim() });

  onChangePort = (port: string) => this.setState({ port: port.trim() });

  onChangePassword = (password: string) => this.setState({ password });

  submitForm = () => {
    const { connectionType, url, port, password } = this.state;
    if (
      this.state.url === "" ||
      this.state.port === "" ||
      this.state.password === ""
    ) {
      this.setState({ pageError: "Please fill in all the fields." });
      return;
    } else {
      this.setState({ pageError: "" });
      this.props.request_login(connectionType, url, port, password);
    }
  };

  selectedHttp(arg) {
    if (this.state.connectionType === "https") {
      if (arg == "https") return { color: colors.green };
      if (arg == "http") return { color: "grey" };
      return { color: "grey" };
    }

    if (this.state.connectionType === "http") {
      if (arg == "http") return { color: colors.green };
      if (arg == "https") return { color: "grey" };
      return { color: "grey" };
    }

    return { color: "grey" };
  }

  _resetForm = () => {
    this.props.reset_login();
    this.setState({
      password: "",
      connectionType: "https",
      url: "",
      port: "443"
    });
  };

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <MyText type="H1">Settings</MyText>
        <View style={{ padding: 10 }}>
          <MyText>Connection</MyText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10
            }}
          >
            <TouchableOpacity
              onPress={this.setHttpConnectionType}
              hitSlop={{ left: 10, right: 10, bottom: 10, top: 10 }}
              style={{
                backgroundColor: colors.backgroundColor,
                borderRadius: 5,
                paddingVertical: 10,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 5
              }}
            >
              <MyText type="button" style={this.selectedHttp("http")}>
                HTTP
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.setHttpsConnectionType}
              hitSlop={{ left: 10, right: 10, bottom: 10, top: 10 }}
              style={{
                backgroundColor: colors.backgroundColor,
                borderRadius: 5,
                paddingVertical: 10,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 5
              }}
            >
              <MyText type="button" style={this.selectedHttp("https")}>
                HTTPS
              </MyText>
            </TouchableOpacity>
          </View>
          <MyText>Server address</MyText>
          <TextInput
            value={this.state.url}
            onChangeText={this.onChangeURL}
            maxLength={100} //editable={!this.props.loggedIn}
            underlineColorAndroid={"rgba(0,0,0,0)"}
            placeholder="Enter URL"
            style={styles.textInputStyle}
            enablesReturnKeyAutomatically
            returnKeyType="next"
            autoCapitalize="none"
          />
          <MyText>Port number</MyText>
          <TextInput
            value={this.state.port}
            onChangeText={this.onChangePort}
            keyboardType="numeric"
            returnKeyType="next" //editable={!this.props.loggedIn}
            enablesReturnKeyAutomatically
            maxLength={5}
            style={styles.textInputStyle}
            underlineColorAndroid={"rgba(0,0,0,0)"}
            placeholder="Enter Port Number (Default is 80)"
          />
          <MyText>Password</MyText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: colors.backgroundColor,
              marginBottom: 10,
              paddingHorizontal: 10
            }}
          >
            <TextInput
              secureTextEntry={this.state.hidePassword}
              value={this.state.password}
              onChangeText={this.onChangePassword}
              maxLength={100} //editable={!this.props.loggedIn}
              style={[
                styles.textInputStyle,
                {
                  borderWidth: 0,
                  width: 300,
                  marginTop: 0,
                  paddingHorizontal: 0,
                  marginBottom: 0,
                  backgroundColor: "rgba(0,0,0,0)"
                }
              ]}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              placeholder="Enter Password"
              returnKeyType="next"
              autoCapitalize="none"
              enablesReturnKeyAutomatically
              placeholderTextColor="#757575"
            />
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  hidePassword: !this.state.hidePassword
                })
              }
              hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
            >
              <Icon
                size={20}
                name={this.state.hidePassword ? "eye-off" : "eye"}
                color={"#cccccc"}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.submitForm}>
            {this.props.loggingIn ? (
              <ActivityIndicator size={"large"} />
            ) : (
                <View style={styles.buttonStyle}>
                  <MyText>Login</MyText>
                </View>
              )}
          </TouchableOpacity>
          <TouchableOpacity onPress={this._resetForm}>
            <View
              style={[
                styles.buttonStyle,
                { backgroundColor: colors.backgroundColor, marginTop: 10, marginBottom: 10 }
              ]}
            >
              <MyText>Reset Form</MyText>
            </View>
          </TouchableOpacity>
          {this.state.pageError.length > 1 && (
            <MyError error text={this.state.pageError} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    data,
    cookies,
    connectionType,
    url,
    port,
    password,
    loggedIn,
    loggingIn
  } = state.ptReducer;
  return {
    cookies,
    loggedIn,
    loggingIn,
    data,
    connectionType,
    url,
    port,
    password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // actions go here
    request_login: bindActionCreators(request_login, dispatch),
    request_data: bindActionCreators(request_data, dispatch),
    reset_login: bindActionCreators(reset_login, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
