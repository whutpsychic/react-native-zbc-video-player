import React from "react";
import Orientation from "react-native-orientation";
import LE from "./lifecycleEl.js";

export default class extends LE {
  onLoad = data => {
    this.setDuration(data);
    const { onLoad } = this.props;
    if (typeof onLoad === "function") {
      onLoad(data);
    }
  };

  onProgress = data => {
    this.setTime(data);
    const { onProgress } = this.props;
    if (typeof onProgress === "function") {
      onProgress(data);
    }
  };

  toggleShowControls = () => {
    const _ifshow = !this.state.showControls;
    const { autoHideControls } = this.state;
    this.setState({
      showControls: _ifshow,
      showVolumnSlider: false
    });
    if (_ifshow && autoHideControls) {
      setTimeout(() => {
        const { autoHideControls } = this.state;
        if (autoHideControls) this.hideControls();
      }, this.state.hideControlsTimeout);
    }
  };

  togglePausePlay = () => {
    const { paused } = this.state;
    this.setState({
      paused: !paused
    });
  };

  onPause = () => {
    this.setState({
      paused: true
    });
  };

  onPlay = () => {
    this.setState({
      paused: false
    });
  };

  pressBackBtn = () => {
    const { orientation } = this.state;
    if (orientation === "LANDSCAPE") {
      this.exitFullscreen();
      return;
    }
    const { onPressBackBtn } = this.props;
    if (typeof onPressBackBtn === "function") onPressBackBtn();
  };

  enterFullscreen = () => {
    this.setState({
      fullscreen: true,
      orientation: "LANDSCAPE"
    });
    Orientation.lockToLandscape();

    const { onEnterFullScreen } = this.props;
    if (typeof onEnterFullScreen === "function") onEnterFullScreen();
  };

  exitFullscreen = () => {
    this.setState({
      fullscreen: false,
      orientation: "PORTRAIT"
    });
    Orientation.lockToPortrait();

    const { onExitFullScreen } = this.props;
    if (typeof onExitFullScreen === "function") onExitFullScreen();
  };

  toggleVolumnSlider = () => {
    const { showVolumnSlider } = this.state;
    this.setState({
      showVolumnSlider: !showVolumnSlider
    });
  };

  pressmoreBtn = () => {
    const { onPressMoreBtn } = this.props;
    if (typeof onPressMoreBtn === "function") onPressMoreBtn();
  };

  _updateOrientation = orientation => this.setState({ orientation });
  _updateSpecificOrientation = specificOrientation =>
    this.setState({ specificOrientation });

  setDuration = duration => {
    this.setState({ duration: duration.duration, loading: false });
  };

  setTime = data => {
    const { slideValue } = this.state;

    if (data.currentTime == slideValue) {
      this.setState({
        loading: true
      });
    } else {
      this.setState({
        slideValue: data.currentTime,
        currentTime: this.renderCurrentTime(data.currentTime),
        loading: false
      });
    }
  };

  renderCurrentTime = _time => {
    let t = parseInt(_time, 10);
    if (t <= 0) {
      return "00 : 00 : 00";
    }

    let _h, _m, _s;
    _h = parseInt(t / 3600);
    _m = parseInt((t - _h * 3600) / 60);
    _s = t - _h * 3600 - _m * 60;

    _h < 10 ? (_h = "0" + _h) : undefined;
    _m < 10 ? (_m = "0" + _m) : undefined;
    _s < 10 ? (_s = "0" + _s) : undefined;

    return _h + " : " + _m + " : " + _s;
  };

  renderTitle = text => {
    const { maxTitleFonts } = this.props || this.state;

    let L = text.length;

    if (L > maxTitleFonts) {
      let arr = [];
      for (let i = 0; i < maxTitleFonts; i++) {
        arr.push(text[i]);
      }
      arr.push("...");
      return arr.join("");
    } else {
      return text;
    }
  };

  hideControls = () => {
    this.setState({
      showControls: false,
      showVolumnSlider: false
    });
  };

  //如果有autohdie 则应该让其暂停
  checkIfAutoHide = () => {
    const { autoHideControls } = this.state;
    if (autoHideControls) {
      this.setState({
        autoHideControls: false,
        reUseThen: true
      });
    }
  };

  //如果暂停autohide 则应该让其恢复autohide
  reAutoHideAction = () => {
    const { reUseThen, hideControlsTimeout } = this.state;
    if (reUseThen) {
      this.setState({
        autoHideControls: true,
        reUseThen: false
      });

      setTimeout(() => {
        this.hideControls();
      }, hideControlsTimeout);
    }
  };

  //
  onEnd = () => {
    this.setState({
      paused: true
    });
    const { onEnd } = this.props;
    if (typeof onEnd === "function") {
      onEnd();
    }
  };
}
