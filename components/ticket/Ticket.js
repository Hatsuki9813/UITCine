import { View, StyleSheet, Text, Image } from "react-native";
import { useState, useEffect } from "react";

import colors from "../../themes/colors";

import { formatFullDate } from "../../modules/formatDateTime";

import { getShowtimeBase } from "../../database/database";

export default function Ticket({ showtime_id }) {
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchShowtimeBase = async () => {
            try {
                const showtimeBase = await getShowtimeBase(showtime_id);
                setData(showtimeBase[0]);
            } catch (error) {
                console.error("Error fetching showtime base: ", error);
            }
        };

        fetchShowtimeBase();
    }, []);

    const [posterContainerWidth, setPosterContainerWidth] = useState(0);

    const styles = getStyles(posterContainerWidth);
    console.log("data showtime: "+data.showtime)
    return (
        <View style={styles.container}>
            <View
                style={styles.posterContainer}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setPosterContainerWidth(width);
                }}
            >
                <Image source={{ uri: data.film_poster }} style={styles.poster} />
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{data.film_name}</Text>
                <Text style={styles.regular}>
                    {data.film_format} {data.format}
                </Text>
                <Text style={styles.regular}>{data.cinema_name}</Text>
                <Text style={styles.semibold}>{formatFullDate(data.showtime)}</Text>
            </View>
        </View>
    );
}

const getStyles = (posterContainerWidth) =>
    StyleSheet.create({
        container: {
            flexDirection: "row",
            padding: 10,
            backgroundColor: "white",
            gap: 10,
            borderRadius: 10,
            shadowColor: colors.gray,
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        posterContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        poster: {
            width: posterContainerWidth,
            height: posterContainerWidth * 1.5,
            borderRadius: 5,
        },
        info: {
            flex: 3,
            gap: 10,
            justifyContent: "center",
        },
        title: {
            fontSize: 20,
            fontFamily: "BVP_SemiBold",
            lineHeight: 30,
        },
        regular: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
        },
        semibold: {
            fontSize: 16,
            fontFamily: "BVP_SemiBold",
        },
    });
