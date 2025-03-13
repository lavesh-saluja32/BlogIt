import React, { useState } from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Table as NeetoTable, Tooltip, Dropdown } from "@bigbinary/neetoui";

const Table = ({ selectedColumns = [], data, handleDelete, handlePublish }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const handleSelect = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const { Menu, MenuItem, Divider } = Dropdown;
  const { Button: MenuButton } = MenuItem;
  const columns = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      render: (text, record) => (
        <Tooltip content={text} position="top">
          <a
            className="block max-w-xs truncate"
            href={`/post/${record.slug}/edit`}
          >
            {text.length > 30 ? `${text.slice(0, 30)}...` : text}
          </a>
        </Tooltip>
      ),
      width: 100,
    },
    {
      dataIndex: "category",
      key: "category",
      title: "Category",
      width: 100,
    },
    {
      dataIndex: "lastPublishedAt",
      key: "lastPublishedAt",
      title: "Last Published At",
      width: 100,
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      width: 100,
    },
    {
      dataIndex: "action",
      key: "action",
      title: "",
      render: (_, record) => (
        <Dropdown
          buttonStyle="text"
          icon={MenuHorizontal}
          position="bottom-end"
          strategy="fixed"
        >
          <Menu>
            <MenuItem>
              <MenuButton
                className="text-black"
                style="link"
                onClick={() =>
                  handlePublish(
                    record.slug,
                    record.status === "Published" ? "unpublished" : "published"
                  )
                }
              >
                {record.status === "Published" ? "Unpublish" : "Publish"}
              </MenuButton>
            </MenuItem>
            <Divider />
            <MenuItem>
              <MenuButton
                label="Delete"
                style="danger"
                type="delete"
                onClick={() => handleDelete(record.slug)}
              >
                Delete
              </MenuButton>
            </MenuItem>
          </Menu>
        </Dropdown>
      ),
      width: 100,
    },
  ];

  return (
    <div>
      <NeetoTable
        enableColumnReorder
        rowSelection
        columns={columns.filter(({ key }) => selectedColumns[key])}
        dataSource={data}
        enableColumnResize={false}
        selectedRowKeys={selectedRowKeys}
        onRowSelect={handleSelect}
      />
    </div>
  );
};
export default Table;
