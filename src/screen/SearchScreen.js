import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import SearchBar from "../component/SearchBar";
import useGetPeople from "../query/useGetPeople";
import PeopleCard from "../component/PeopleCard";

const SearchScreen = () => {
    const [input, setInput] = useState("");
    const [debounceedSetSearchText, isLoading, error, data, isFetching, isFetchingNextPage,
        hasNextPage, fetchNextPage] = useGetPeople();

    if (error) {
        return (
            <Text style={styles.textStyle}>`Something went wrong!!! ${error.message}`</Text>
        );
    }

    let list = data?.pages?.map(value => value.results) ?? []
    list = list?.flat()

    console.log(hasNextPage, isFetchingNextPage);

    return (
        <View style={{ flexDirection: "column", flex: 1, marginTop: 80 }}>
            <SearchBar
                input={input}
                onTextChange={(text) => {
                    setInput(text);
                    debounceedSetSearchText(text);
                }} />
            {isLoading ?
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View> :
                <FlatList
                    key={item => item.url}
                    data={list}
                    renderItem={({ item }) => {
                        //console.log(item);
                        return <PeopleCard personData={item} />
                    }}
                    onEndReached={hasNextPage ? () => fetchNextPage() : null}
                    onEndReachedThreshold={0.5}
                />}
            {isFetchingNextPage ?
                <View style={{ alignItems: "center" }}>
                    <ActivityIndicator size='large' />
                </View> :
                null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 50,
        fontSize: 20
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default SearchScreen;