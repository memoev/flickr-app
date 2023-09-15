import React, { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { FeedItem } from "../../api/endpoints/public-feed/feedTypes";

type TableProps = {
  feeds: FeedItem[];
};

const TableFeedList = ({ feeds }: TableProps) => {
  const columns = useMemo<MRT_ColumnDef<FeedItem>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 250,
      },
      {
        accessorKey: "link",
        id: "link",
        header: "Image",
        size: 200,
        enableGlobalFilter: false,
        Cell: ({ row }) => (
          <img
            alt={row.original.title}
            height={100}
            loading="lazy"
            src={row.original.link}
          />
        ),
      },
      {
        accessorFn: (row) => row.tags.join(""),
        // accessorKey: "tags",
        header: "Tags",
        size: 150,
        enableGlobalFilter: false,
        Cell: ({ row }) => (
          <div>
            {row.original.tags.map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={feeds}
      enableGlobalFilter={false} //disable search feature
      enableColumnFilters={false} //disable column filters
    />
  );
};

export default TableFeedList;
