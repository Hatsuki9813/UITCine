import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function Contacts({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Thông tin liên hệ" navigation={navigation} />
            <View>
                <Text style={styles.text}>Thông tin liên hệ</Text>
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
