import React from "react";
import Orientation from "react-native-orientation";

export default class extends React.Component {
  componentDidMount() {
    //屏幕旋转相关
    const init = Orientation.getInitialOrientation();
    this.setState({
      init,
      orientation: init,
      specificOrientation: init
    });
    Orientation.addOrientationListener(this._updateOrientation);
    Orientation.addSpecificOrientationListener(this._updateSpecificOrientation);

    /***************** 覆盖设置项群组 *****************/
    const { autoHideControls, hideControlsTimeout, playerHeight } = this.props;

    //类型判断
    if (hideControlsTimeout && typeof hideControlsTimeout !== "number") {
      throw new Error("property 'hideControls' must be a number");
    }

    if (playerHeight && typeof playerHeight !== "number") {
      throw new Error("property 'playerHeight' must be a number");
    }

    if (autoHideControls !== undefined) {
      this.setState({
        autoHideControls
      });
    }

    if (playerHeight !== undefined) {
      this.setState({
        playerHeight
      });
    }

    if (hideControlsTimeout) {
      this.setState({
        hideControlsTimeout
      });
    }

    /************************************************/
    //自动隐藏控制条
    if (autoHideControls !== false) {
      setTimeout(() => {
        this.hideControls();
      }, hideControlsTimeout || this.state.hideControlsTimeout);
    }
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    });
    this.exitFullscreen();
    Orientation.removeOrientationListener(this._updateOrientation);
    Orientation.removeSpecificOrientationListener(
      this._updateSpecificOrientation
    );
  }
}
