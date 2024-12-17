import { useFonts } from "expo-font";

export default async function loadFonts() {
    const [loaded] = useFonts({
        BVP_Bold: require("../assets/fonts/BeVietnamPro-Bold.ttf"),
        BVP_SemiBold: require("../assets/fonts/BeVietnamPro-SemiBold.ttf"),
        BVP_Medium: require("../assets/fonts/BeVietnamPro-Medium.ttf"),
        BVP_Regular: require("../assets/fonts/BeVietnamPro-Regular.ttf"),
    });

    if (!loaded) {
        return null;
    }
}
