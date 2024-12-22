import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function FAQ({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Câu hỏi thường gặp" navigation={navigation} />
            <View>
                <Text style={styles.text}>FAQ</Text>
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
