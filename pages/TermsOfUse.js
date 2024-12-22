import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function TermsOfUse({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Điều khoản và chính sách" navigation={navigation} />
            <View>
                <Text style={styles.text}>Điều khoản và chính sách</Text>
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
