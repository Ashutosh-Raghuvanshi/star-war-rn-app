import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getPeople } from "../api/swapi";
import { useDebouncedCallback } from 'use-debounce';
import { savedKeywordContext } from "../provider/SavedKeywords";

useInfiniteQuery

export default () => {
    const keywordsContext = useContext(savedKeywordContext);
    const [searchText, setSearchText] = useState("");
    const debounceedSetSearchText = useDebouncedCallback((text) => {
        setSearchText(text);
        keywordsContext.saveKeyword(text);
    }, 500);

    const { isLoading, error, data, isFetching, isFetchingNextPage,
        hasNextPage, fetchNextPage } = useInfiniteQuery({
            queryKey: ["people", { searchText }],
            getNextPageParam: prevData => prevData.next,
            queryFn: ({ pageParam = `https://swapi.dev/api/people/?page=1&search=${encodeURIComponent(searchText)}` }) => {
                console.log(pageParam)
                return getPeople(pageParam)
            }
        });

    return [debounceedSetSearchText, isLoading, error, data, isFetching, isFetchingNextPage,
        hasNextPage, fetchNextPage];
}