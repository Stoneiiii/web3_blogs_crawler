import { useQuery } from "@apollo/client";

import { BlogsTable } from "./BlogsTable";
import { BlogEntryType, GET_ALLBLOGS, GetBlogEntriesData } from "./graphql/GetAllBlogs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";



export function BlogContainer() {
    const [page, setPage] = useState(1); 
    const [cache, setCache] = useState<{ [key: number]: BlogEntryType[] }>({});
    const [isNextPageAvailable, setIsNextPageAvailable] = useState(true);
    const size = 20; 

    const { loading, error, data, refetch } = useQuery<GetBlogEntriesData>(
        GET_ALLBLOGS, {
            variables: { page, size },
            skip: !!cache[page]
    });

    const { data: prevPageData } = useQuery<GetBlogEntriesData>(GET_ALLBLOGS, {
        variables: { page: page - 1, size },
        skip: page <= 1 || !!cache[page - 1], 
    });

    const { data: nextPageData } = useQuery<GetBlogEntriesData>(GET_ALLBLOGS, {
        variables: { page: page + 1, size },
        skip: !!cache[page + 1], 
    });

    useEffect(() => {
        if (data) {
            setCache((prevCache) => ({ ...prevCache, [page]: data.getAllEntries }));
        }
        if (cache[page+1] && cache[page+1].length > 0) {
            setIsNextPageAvailable(true);
        }
        if (nextPageData) {
            setIsNextPageAvailable(true);
            setCache((prevCache) => ({ ...prevCache, [page + 1]: nextPageData.getAllEntries }));
            setIsNextPageAvailable(nextPageData.getAllEntries.length > 0); 
        }
        if (prevPageData) {
            setCache((prevCache) => ({ ...prevCache, [page - 1]: prevPageData.getAllEntries }));
        }
        setCache((prevCache) => {
            const newCache = { ...prevCache };
            Object.keys(newCache).forEach((key) => {
                const pageKey = parseInt(key, 10);
                if (pageKey < page - 1 || pageKey > page + 1) {
                    delete newCache[pageKey];
                }
            });
            return newCache;
        });
    }, [data, prevPageData, nextPageData, page]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    const entries = cache[page] || data?.getAllEntries || [];

    const handleNextPage = () => {
        if (isNextPageAvailable) {
            setPage((prevPage) => prevPage + 1);
            if (!cache[page + 1]) {
                refetch({ page: page + 1, size });
            }
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
            if (!cache[page - 1]) {
                refetch({ page: page - 1, size });
            }
        }
    };

    return (
        <div className="container">
            <BlogsTable entries={entries} />
            <div className="pagination-controls text-center mt-4">
                <Button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </Button>
                <span className="px-4">Page {page}</span>
                <Button onClick={handleNextPage} disabled={!isNextPageAvailable}>Next</Button>
            </div>
        </div>
    );
}
