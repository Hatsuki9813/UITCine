import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

import Ticket from "../components/ticket/Ticket";

import { useAuth } from "../contexts/AuthContext";
import { getUsersTicket } from "../database/database";

export default function UsedTickets({ navigation }) {
    const styles = getStyles();
    const { username } = useAuth();
    const [groupedTickets, setGroupedTickets] = useState({});

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await getUsersTicket(username, 1);

                // Group tickets by month and sort groups by date
                const grouped = groupTicketsByMonth(fetchedTickets); // Dùng fetchedTickets thay vì tickets
                setGroupedTickets(grouped);
            } catch (error) {
                console.error("Error fetching tickets: ", error);
            }
        };

        fetchTickets();
    }, []);

    const groupTicketsByMonth = (tickets) => {
        const grouped = tickets.reduce((acc, ticket) => {
            const date = new Date(ticket.day); // Assuming `ticket.day` is the timestamp of the ticket
            const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // e.g., "2024-11"

            if (!acc[monthYear]) acc[monthYear] = [];
            acc[monthYear].push(ticket);

            return acc;
        }, {});

        // Sort groups by month (descending)
        return Object.keys(grouped)
            .sort((a, b) => new Date(b) - new Date(a)) // Sort by date descending
            .reduce((sortedAcc, key) => {
                sortedAcc[key] = grouped[key];
                return sortedAcc;
            }, {});
    };

    const TicketButton = ({ data }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("TicketDetails", { ticketData: data })}>
                <Ticket showtime_id={data.showtime_id} />
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.note}>Hệ thống chỉ hiển thị 30 giao dịch gần nhất.</Text>
                {Object.keys(groupedTickets).map((monthYear) => (
                    <View key={monthYear} style={styles.group}>
                        {/* Display month-year */}
                        <Text style={styles.timeline}>{monthYear}</Text>
                        {/* Display tickets for the month */}
                        {groupedTickets[monthYear].map((ticket) => (
                            <View key={ticket.id} style={styles.ticket}>
                                <TicketButton data={ticket} />
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const getStyles = () =>
    StyleSheet.create({
        background: {
            flex: 1,
        },
        container: {
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        note: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
            color: "black",
            textAlign: "center",
        },
        timeline: {
            fontSize: 16,
            fontFamily: "BVP_Regular",
            color: "black",
            marginVertical: 10,
            textAlign: "center",
        },
        ticket: {
            marginBottom: 10,
        },
    });
