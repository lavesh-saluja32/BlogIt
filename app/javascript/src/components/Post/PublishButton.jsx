import React from "react";

import { ActionDropdown } from "@bigbinary/neetoui";

const PublishButton = ({ isDelete, handleSubmit, values, handleDelete }) => {
  const { Menu, MenuItem, Divider } = ActionDropdown;
  const { Button } = MenuItem;

  return (
    <div className="z-10">
      <ActionDropdown buttonStyle="secondary" label="Publish">
        <Menu>
          <Button
            type="submit"
            onClick={() => handleSubmit(values, "published")}
          >
            Publish
          </Button>
          <Button
            type="submit"
            onClick={() => handleSubmit(values, "unpublished")}
          >
            Save as draft
          </Button>
          {isDelete && (
            <>
              <Divider />
              <Button style="danger" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Menu>
      </ActionDropdown>
    </div>
  );
};

export default PublishButton;
