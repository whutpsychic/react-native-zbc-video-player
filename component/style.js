import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  defaultbackground: {
    width: "100%",
    backgroundColor: "#000"
  },
  indicator: {
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center"
  },
  videoContainer: {
    width: "100%",
    backgroundColor: "#000"
  },
  videoPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  controlsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  controlbar: {
    width: "100%",
    position: "absolute",
    left: 0
  },
  topbar: {
    top: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  bottombar: {
    bottom: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  virtualbottombar: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    height: 44,
    position: "absolute",
    bottom: 0,
    left: 0
  },
  videoTitle: {
    flex:1,
    marginLeft: 10,
    marginRight: 10,
    color: "#fff",
    fontSize: 18
  },
  imgBtn: {
    width: 24,
    height: 24,
    margin: 10,
    textAlign: "center"
  },
  backupBtn: {},
  topbarbtns: {},
  playBtn: {
    textAlign: "center"
  },
  slider: {
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  videoProgress: {
    flex: 1,
    height: 44
  },
  currentTime: {
    fontSize: 12,
    color: "#fff",
    width: 80,
    height: 44,
    lineHeight: 44,
    textAlign: "center"
  },
  bottombarbehindBtns: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end"
  },
  volumnContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 144
  },
  volumnSlider: {
    rotation: -90,
    position: "absolute",
    bottom: 70,
    width: 100,
    height: 44,
    zIndex: 100
  },
  volumnBtn: { marginLeft: 0 },
  fullsreenBtn: {
    marginLeft: 0
  }
});

export default styles;
