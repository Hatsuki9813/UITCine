import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/Header";
export default function Contacts({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Thông tin liên hệ" navigation={navigation} />
            <View >
                <Text style={styles.headertext}>
                    <Text style={styles.emailLabel}>Hotline:</Text> 1900000co
                </Text>
                <Text style={styles.headertext}>
                    <Text style={styles.emailLabel}>Email:</Text> customerservice@uitcine.com
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    headertext: {
        fontSize: 20,
        fontStyle: 'italic',
        marginLeft: 20,

    },
    contactinfo: {

    },
    emailLabel: {
        fontWeight: 'bold',
        color: '#7e60bf',
      },
});
