import { StyleSheet, View, Dimensions, Image, StatusBar } from "react-native";
import React, { useRef } from "react";
import Carousel from "react-native-snap-carousel";
import HomeTop from "../controllers/HomeTop";

const banners = [
    require("../assets/banner/meo-ma.jpg"),
    require("../assets/banner/transformer.jpg"),
    require("../assets/banner/ring.jpg"),
    require("../assets/banner/venom.jpg"),
    require("../assets/banner/xich.jpg"),
    require("../assets/banner/cong-tu.jpg"),
];

export default function Home({ navigation }) {
    const screenWidth = Dimensions.get("window").width;
    const carouselRef = useRef(null);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View>
                <Carousel
                    ref={carouselRef}
                    data={banners}
                    renderItem={({ item }) => <Image source={item} style={styles.image} />}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    autoplay={true}
                    loop={true}
                    autoplayInterval={3000}
                    inactiveSlideScale={1} // Giữ tỷ lệ ảnh khi không active
                    inactiveSlideOpacity={1} // Hiển thị đầy đủ các slide không active
                    style={{ height: (screenWidth * 16) / 35 }}
                />
            </View>
            <HomeTop navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: (Dimensions.get("window").width * 16) / 35,
    },
});
