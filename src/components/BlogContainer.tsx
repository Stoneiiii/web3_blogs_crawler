import { useQuery } from "@apollo/client";


import { BlogsTable } from "./BlogsTable";
import { GET_ALLBLOGS, GetBlogEntriesData } from "./graphql/GetAllBlogs";



export function BlogContainer() {
    const { loading, error, data } = useQuery<GetBlogEntriesData>(
        GET_ALLBLOGS
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const entries = data?.getAllEntries  || [];
    return (
        <div className="container">
            <BlogsTable entries={entries} />
        </div>
    );
}
