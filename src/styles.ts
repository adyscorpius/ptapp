import { StyleSheet } from "react-native";
const colors2: any = {
  backgroundColor: "#100e2e", // '#7A709C',
  darkBackgroundColor: "#1d1951",
  headerBackground: "#18151e",
  fontColor: "#cecece",
  fontColorMain: "#fff"
};

const colors = {
  backgroundColor: '#34343e',
  lightBackgroundColor: '#4b4b56',
  darkBackgroundColor: '#292931',
  headerBackground: '#4b4b56',
  textColor: '#fff',
  darkTextColor: '#57575a',
  fontColor: '#fff',
  fontColorMain: '#cecece',
  purple: '#52B3D9',
  red: '#F03434',
  green: '#03A678'
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: colors.headerBackground
  },
  container: {
    flex: 1,
    backgroundColor: "#292d31",
    padding: 5,
    paddingTop: 10
  },
  defaultTextStyle: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "sans-serif",
    paddingVertical: 4,
    justifyContent: "center"
  },
  buttonStyle: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purple
  },
  headingTextStyle: {
    fontSize: 20,
    color: "#fff",
    paddingBottom: 16,
    fontFamily: "Pacifico-Regular"
  },
  buttonTextStyle: {
    color: "red",
    fontFamily: "sans-serif",
    fontSize: 18,
    fontWeight: "bold"
  },
  textInputStyle: {
    padding: 10,
    color: "#fff",
    marginBottom: 10,
    //borderColor: '#cccccc',
    backgroundColor: colors.backgroundColor
    //borderWidth: 1
  },
  tilesRow: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 0
  },
  TilesHeaderStyle: {
    color: "#fff",
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  tiles: {
    borderRadius: 10,
    flex: 1,
    alignItems: "flex-end",
    margin: 2,
    padding: 2
  },
  tilesTitleText: {
    color: "#cecece",
    fontSize: 15,
    fontFamily: "Catamaran-Light",
    paddingBottom: 5
  },
  tilesSubText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Lato",
    padding: 0,
    margin: 0,
    fontWeight: "600"
  },
  tilesText: {
    color: "#fff",
    padding: 0,
    margin: 0,
    fontWeight: "600"
  }
});

export { styles, colors };
