import React, { useContext } from "react";
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import { savedKeywordContext } from "../provider/SavedKeywords";

const SearchBar = ({ input, onTextChange }) => {
    const keywordsContext = useContext(savedKeywordContext);

    return (
        <View>
            <View style={styles.containerStyle}>
                <Feather name="search" size={30} />
                <TextInput
                    style={styles.inputStyle}
                    value={input}
                    onChangeText={onTextChange}
                    placeholder="Search"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            {
                keywordsContext.keywords.length ?
                    <FlatList
                        data={keywordsContext.keywords}
                        key={(item => item)}
                        renderItem={({ item }) => <TouchableOpacity onPress={() => { onTextChange(item) }}>
                            <Text style={styles.keywordsStyle}>{item}</Text>
                        </TouchableOpacity>}
                    /> :
                    null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        height: 50,
        backgroundColor: "#E1E1E1",
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        marginHorizontal: 10,
    },
    keywordsStyle: {
        marginVertical: 5,
        marginHorizontal: 10,
        fontSize: 14,
    }
});

export default SearchBar
