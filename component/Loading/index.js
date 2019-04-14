import React from "react";
import { View, Image } from "react-native";

import styles from "../style.js";
import gif from "./loading.gif";

export default class extends React.Component {
	render() {
		const { visible } = this.props;

		if (visible)
			return (
				<View style={[styles.indicator]}>
					<Image style={styles.indicatorImg} source={gif} />
				</View>
			);

		return <View />;
	}
}
