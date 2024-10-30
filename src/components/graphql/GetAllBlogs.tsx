import gql from "graphql-tag";


export const GET_ALLBLOGS = gql`
query {
  getAllEntries {
    description
    id
    articlebody
    time
    title
    url
  }
}
`;

export type BlogEntryType = {
  id: number;
  description: string;
  articlebody: string;
  time: string;
  title: string;
  url: string;
};

// 定义查询结果的类型
export interface GetBlogEntriesData {
  getAllEntries: BlogEntryType[];
}

