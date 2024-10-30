import { BlogEntryType } from "./graphql/GetAllBlogs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface BlogTableProps {
  entries: BlogEntryType[];
}

export function BlogsTable({ entries }: BlogTableProps) {
  return (
    <Table className="blog-table">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[400px]">Title</TableHead >
          <TableHead className="text-center ">Description</TableHead >
          <TableHead className="text-center">Time</TableHead >
          <TableHead className="text-center">URL</TableHead >
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="text-center ">{entry.title}</TableCell >
            <TableCell >{entry.description}</TableCell >
            <TableCell >{new Date(entry.time).toLocaleDateString()}</TableCell >
            <TableCell >
              <a href={entry.url} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            </TableCell >
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}