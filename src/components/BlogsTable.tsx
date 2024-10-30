import { BlogEntryType } from "./graphql/GetAllBlogs";

interface BlogTableProps {
  entries: BlogEntryType[];
}

export function BlogsTable({ entries }: BlogTableProps) {
  return (
    <table className="blog-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Content</th>
          <th>Time</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.title}</td>
            <td>{entry.description}</td>
            <td>{entry.time}</td>
            <td>
              <a href={entry.url} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}