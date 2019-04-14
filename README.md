## react-native-zbc-video-player

A `<Video>` component with controls for react-native,based on [react-native-video](https://github.com/react-native-community/react-native-video)


```react-native-video``` version 4.x requires react-native >= 0.57.0

```react-native-video``` version 3.x requires react-native >= 0.40.0

## Demo

![](./demo.gif)

## Current version：0.1.3

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

> **Tips:**
> Cause the ActivityIndicator of React-native has bugs, after ver.0.1.3 I get a gif file takes the place of it. So please make sure that the configure file of your project support gif. For more Information, please see the docs about `<Image/>` of React-native.


Using npm:

```shell
npm install --save react-native-video
npm install --save @react-native-community/slider
npm install --save react-native-orientation
npm install --save react-native-vector-icons
npm install --save react-native-zbc-video-player
```

or using yarn:

```shell
yarn add react-native-video
yarn add @react-native-community/slider
yarn add react-native-orientation
yarn add react-native-vector-icons
yarn add react-native-zbc-video-player
```

Then follow the instructions for your platform to link react-native-video into your project:

<details>
  <summary>iOS</summary>

### Standard Method

Run 

```shell
react-native link react-native-video
react-native link @react-native-community/slider
react-native link react-native-orientation
react-native link react-native-vector-icons
```

to link the react-native-video library.

> Warning: this component is now unpredictable for IOS. But It will work fine in the future.
---
</details>


<details>
  <summary>Android</summary>

Run 

```shell
react-native link react-native-video
react-native link @react-native-community/slider
react-native link react-native-orientation
react-native link react-native-vector-icons
```

to link the react-native-video library.

Or if you have trouble, make the following additions to the given files manually:

**android/settings.gradle**

```gradle
include ':@react-native-community_slider'
project(':@react-native-community_slider').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/slider/android')
include ':react-native-vector-icons'
project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')
include ':react-native-orientation'
project(':react-native-orientation').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-orientation/android')
include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android-exoplayer')

```

If you need to use the old Android MediaPlayer based player, use the following instead:

```gradle
include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android')
```


**android/app/build.gradle**

```gradle
dependencies {
   ...
  	implementation project(':@react-native-community_slider')
    implementation project(':react-native-vector-icons')
    implementation project(':react-native-orientation')
    implementation project(':react-native-video')
}
```

**MainApplication.java**

On top, where imports are:

```java
import com.brentvatne.react.ReactVideoPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;
```

Add the `ReactVideoPackage` class to your list of exported packages.

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new ReactSliderPackage(),
            new VectorIconsPackage(),
            new OrientationPackage(),
            new ReactVideoPackage()
    );
}
```
---
</details>



## Usage

```javascript
// Load the module
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import VideoPlayer from "react-native-zbc-video-player";

const movieDetailUrl =
  "http://qukufile2.qianqian.com/data2/video/d33d7035e19253b19f379b7f9aa98c6e/612987418/612987418.mp4";

const playerHeight = 250;

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <VideoPlayer
          source={{ uri: movieDetailUrl }}
          style={styles.backgroundVideo}
          playerHeight={playerHeight}
          title="xxx"
          // maxTitleFonts={10}
          // onPressBackBtn={this.pressBackBtn}
          // onEnterFullScreen={this.enterFullscreen}
          // onExitFullScreen={this.exitFullscreen}
          // onPressMoreBtn={this.pressmoreBtn}
          // onLoad={this.onLoadVideo}
          // repeat={true}
          // autoHideControls={false}
          // hideControlsTimeout={6000}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#F5FCFF"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
```
----
This component extends all props and events from `react-native-video`,for more info. U could see [react-native-video](https://github.com/react-native-community/react-native-video).

### Configurable props
* [autoHideControls](#autoHideControls)
* [hideControlsTimeout](#hideControlsTimeout)
* [maxTitleFonts](#maxTitleFonts)
* [playerHeight](#playerHeight)
* [source](#source)
* [title](#title)


### Event props
* [onEnterFullScreen](#onEnterFullScreen)
* [onExitFullScreen](#onExitFullScreen)
* [onLoad](#onLoad)
* [onPressBackBtn](#onPressBackBtn)
* [onPressMoreBtn](#onPressMoreBtn)


### Configurable props

#### autoHideControls 
* default: true

Configure the controllers whether can be hide automatically.

#### hideControlsTimeout 
* default: 5000 (ms)

How long after no action trigger hiding the controllers.


#### maxTitleFonts

 * default: 12

The maximum font number of the title will be shown .Other fonts would be replaced with "...".

#### playerHeight

 * default: 250

How height the component will performance.

#### source

It is the same as the prop from 'react-native-video'

#### title

Text shown for title.

### Event props

#### onEnterFullScreen
Callback function that is called when the media transform to fullscreen mode.

#### onExitFullScreen
Callback function that is called when the media transform to fullscreen mode.

#### onLoad
Callback function called when the video start.

#### onPressBackBtn
Callback function that is called when you press "back button".

#### onPressMoreBtn
Callback function that is called when you press "more button".

#### onEnd
Callback function that is called when the player reaches the end of the media.

## TODOS

- [ ] Slide left side of the media to justify brightness.
- [ ] A longer video process bar with both current play time & media duration-time.
- [ ] Custom Loading gif

## TODOS(CN)

- [ ] 滑动视频左半部分可以改变亮度，右半部分改变音量。
- [ ] 视频进度条分上层更宽，并附加当前时间和总时长。
- [ ] 自定义loading动画。



---

**MIT Licensed**
