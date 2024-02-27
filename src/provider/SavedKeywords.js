import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const savedKeywordContext = createContext({
    keywords: [],
    saveKeyword: (text) => { },
    removeKeyword: (text) => { },
});

const SavedKeywordProvider = ({ children }) => {
    const [keywords, setKeywords] = useState([]);

    const saveKeyword = (text) => {
        const arr = [text, ...(keywords.slice(0, 9))];
        setKeywords(arr);
        AsyncStorage.setItem("keywords", JSON.stringify(arr));
    }

    const removeKeyword = (text) => {
        const arr = keywords.filter(val => val !== text);
        setKeywords(arr);
        AsyncStorage.setItem("keywords", JSON.stringify(arr));
    }

    useEffect(() => {
        AsyncStorage.getItem("keywords", (err, result) => {
            if (result) {
                setKeywords(JSON.parse(result));
            }
        })
    }, []
    );

    const value = {
        keywords: keywords,
        saveKeyword: saveKeyword,
        removeKeyword: removeKeyword,
    }

    return (
        <savedKeywordContext.Provider value={value}>{children}</savedKeywordContext.Provider>
    );
}

export default SavedKeywordProvider;