import React, { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { FeedItem } from "../../api/endpoints/public-feed/feedTypes";

type TableProps = {
  feeds: FeedItem[];
};

const COLUMN_WIDTH = 200;

const ImageCell = ({ title, link }: Omit<FeedItem, "tags">) => (
  <img alt={title} height={100} src={link} />
);

const TagsCell = ({ tags }: Pick<FeedItem, "tags">) => (
  <div>
    {tags.map((tag) => (
      <div key={tag}>{tag}</div>
    ))}
  </div>
);

const TableFeedList = ({ feeds }: TableProps) => {
  const columns = useMemo<MRT_ColumnDef<FeedItem>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: COLUMN_WIDTH * 1.25,
      },
      {
        accessorKey: "link",
        id: "link",
        header: "Image",
        size: COLUMN_WIDTH * 1.25,
        enableGlobalFilter: false,
        Cell: ({ row }) => (
          <ImageCell title={row.original.title} link={row.original.link} />
        ),
      },
      {
        accessorFn: (row) => row.tags.join(""),
        id: "tags",
        header: "Tags",
        size: COLUMN_WIDTH,
        enableGlobalFilter: false,
        Cell: ({ row }) => <TagsCell tags={row.original.tags} />,
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
