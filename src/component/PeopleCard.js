import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const PeopleCard = ({ personData }) => {
    if (!personData) {
        return null;
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
                <Image
                    source={{ uri: personData?.image ?? "https://cdn-icons-png.flaticon.com/512/5556/5556499.png" }}
                    style={styles.imageStyle}
                />
                <View style={styles.textContent}>
                    <Text style={styles.titleStyle}>{personData.name}</Text>
                    <Text style={styles.subtitleStyle}>{personData.gender}</Text>
                    <Text style={styles.descriptionStyle}>{`Height: ${personData.height}`}</Text>
                    <Text style={styles.descriptionStyle}>{`Birth Year: ${personData.birth_year}`}</Text>
                    <Text style={styles.descriptionStyle}>{`Films: ${personData.films.length ?? 0}`}</Text>
                    <Text style={styles.descriptionStyle}>{`Vehicles: ${personData.vehicles.length ?? 0}`}</Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    subtitleStyle: {
        fontSize: 16,
        color: "gray"
    },
    descriptionStyle: {
        fontSize: 14,
        color: "gray"
    },
    imageStyle: {
        height: 100,
        width: 100
    },
    cardContainer: {
        paddingTop: 30,
        paddingBottom: 30,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { x: 10, y: 10 },
        shadowOpacity: 1,
        elevation: 20,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    textContent: {
        flexDirection: "column",
        marginHorizontal: 20
    },
});

export default PeopleCard;
