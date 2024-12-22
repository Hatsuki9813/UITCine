import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function Settings({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Cài đặt" navigation={navigation} />
            <View>
                <Text style={styles.text}>Cài đặt</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
    },
});
