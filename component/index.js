// ***************** 功能需求 *******************
//
// √1.全屏播放切换
// √2.暂停/继续
// √3.调节音量（包括静音）
// √4.拖动进度条可以跳播放进度
// √5.后退按钮预操作
// √6.右上角操作预留
// √7.加载视频时的loading提示图层
//
//开发者：zbc             首版开发日期：2019-04-04
//                       上一次维护日期：2019-04-11
//QQ:1511828529
// ***************** 功能需求 *******************
import React from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import Slider from "@react-native-community/slider";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./style";

import EP from "./eventsEl.js";

const deviceInfo = {
  deviceWidth: Dimensions.get("window").width,
  deviceHeight:
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : Dimensions.get("window").height - 24
};

const IconSize = 20;

export default class extends EP {
  state = {
    //显示控制条
    showControls: true,

    //是否暂停
    paused: false,

    //全屏状态
    fullscreen: false,

    //显示音量调节
    showVolumnSlider: false,

    //声音控制相关
    volumnValue: 0.5,

    //倍速(0为暂停)
    rate: 1,

    //播放进度
    slideValue: 0.0,
    duration: 0,
    //当前时间
    currentTime: "00 : 00 : 00",

    //loading
    loading: true,

    //横竖屏状态
    orientation: null,
    specificOrientation: null,

    //样式相关
    //最多标题显示字数
    maxTitleFonts: 12,

    //允许自动隐藏控制条
    autoHideControls: true,
    reUseThen: false,

    //自动隐藏控制条时间
    hideControlsTimeout: 5000,

    playerHeight: 250
  };

  render() {
    const {
      showControls,
      orientation,
      paused,
      fullscreen,
      showVolumnSlider,
      volumnValue,
      rate,
      maxFonts,
      playerHeight
    } = this.state;
    const url = this.props.source.uri;
    const { title } = this.props;
    return url ? (
      <TouchableWithoutFeedback onPress={this.toggleShowControls}>
        <View
          style={[
            styles.videoContainer,
            {
              height:
                orientation === "PORTRAIT"
                  ? playerHeight
                  : deviceInfo.deviceWidth,
              marginTop:
                orientation === "PORTRAIT"
                  ? Platform.OS === "ios"
                    ? 20
                    : 0
                  : 0
            }
          ]}
        >
          <Video
            ref={ref => {
              this.player = ref;
            }}
            source={{ uri: url }}
            style={[styles.videoPlayer]}
            resizeMode="contain"
            paused={paused}
            fullscreen={fullscreen}
            volume={volumnValue}
            rate={rate}
            repeat={false}
            {...this.props}
            onLoad={this.onLoad}
            onEnd={this.onEnd}
            onProgress={this.onProgress}
          />
          {showControls ? (
            <View style={styles.controlsContainer}>
              <View style={[styles.controlbar, styles.topbar]}>
                <TouchableOpacity onPress={this.pressBackBtn}>
                  {
                    <Icon
                      style={[styles.imgBtn, styles.backupBtn]}
                      name="md-arrow-back"
                      size={IconSize}
                      color="#fff"
                    />
                  }
                </TouchableOpacity>
                <Text style={styles.videoTitle}>{this.renderTitle(title)}</Text>
                <TouchableOpacity onPress={this.pressmoreBtn}>
                  <Icon
                    style={[styles.imgBtn, styles.topbarbtns]}
                    name="md-more"
                    size={IconSize}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.controlbar, styles.bottombar]}>
                <View style={styles.virtualbottombar} />
                <TouchableOpacity onPress={this.togglePausePlay}>
                  <Icon
                    style={[styles.imgBtn, styles.playBtn]}
                    name={paused ? "md-arrow-dropright" : "md-pause"}
                    size={paused ? IconSize * 1.2 : IconSize}
                    color="#fff"
                  />
                </TouchableOpacity>
                {/*************** 播放进度条 ***************/}
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    this.onPause();
                    this.checkIfAutoHide();
                  }}
                >
                  <Slider
                    style={[styles.slider, styles.videoProgress]}
                    value={this.state.slideValue}
                    maximumValue={this.state.duration}
                    step={1}
                    onValueChange={value =>
                      this.setState({
                        currentTime: this.renderCurrentTime(value)
                      })
                    }
                    onSlidingComplete={value => {
                      this.player.seek(value);
                      this.onPlay();
                      this.reAutoHideAction();
                    }}
                  />
                </TouchableWithoutFeedback>
                <Text style={styles.currentTime}>{this.state.currentTime}</Text>
                <View style={styles.bottombarbehindBtns}>
                  <View style={styles.volumnContainer}>
                    <TouchableOpacity onPress={this.toggleVolumnSlider}>
                      <Icon
                        style={[styles.imgBtn, styles.volumnBtn]}
                        name={
                          volumnValue > 0
                            ? volumnValue > 0.5
                              ? "md-volume-high"
                              : "md-volume-low"
                            : "md-volume-off"
                        }
                        size={IconSize}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    {showVolumnSlider ? (
                      <TouchableWithoutFeedback
                        onPressIn={() => {
                          this.checkIfAutoHide();
                        }}
                      >
                        <Slider
                          style={[styles.slider, styles.volumnSlider]}
                          step={0.1}
                          value={0.5}
                          onValueChange={value =>
                            this.setState({ volumnValue: value })
                          }
                          onSlidingComplete={value => {
                            this.reAutoHideAction();
                          }}
                          minimumValue={0}
                          maximumValue={1}
                        />
                      </TouchableWithoutFeedback>
                    ) : (
                      undefined
                    )}
                  </View>

                  {orientation === "PORTRAIT" ? (
                    <TouchableOpacity onPress={this.enterFullscreen}>
                      <Icon
                        style={[styles.imgBtn, styles.fullsreenBtn]}
                        name="md-expand"
                        size={IconSize}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={this.exitFullscreen}>
                      <Icon
                        style={[styles.imgBtn, styles.fullsreenBtn]}
                        name="md-contract"
                        size={IconSize}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ) : (
            undefined
          )}
          {this.renderLoading()}
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <View style={[styles.defaultbackground, { height: playerHeight }]} />
    );
  }

  renderLoading = () => {
    const { loadingColor } = this.props;

    return (
      <Modal
        animationType={"none"}
        transparent={true}
        visible={this.state.loading}
        onRequestClose={() => console.log("Modal has been closed.")}
      >
        <View
          style={[
            styles.indicator,
            {
              width: deviceInfo.deviceWidth,
              height: this.state.playerHeight
            }
          ]}
        >
          <ActivityIndicator
            animating={true}
            style={[{ height: 80 }]}
            color={loadingColor || "red"}
            size="large"
          />
        </View>
      </Modal>
    );
  };
}
