import React from "react";

import { Modal, Typography, Button } from "@bigbinary/neetoui";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  handleBulkDestroy,
}) => {
  const { Header, Body, Footer } = Modal;

  return (
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <Header description="warning">
        <Typography style="h2">Delete all posts</Typography>
      </Header>
      <Body>This action can't be undone</Body>
      <Footer className="space-x-3">
        <Button label="Delete all" style="danger" onClick={handleBulkDestroy} />
        <Button
          label="Cancel"
          style="secondary"
          onClick={() => setShowDeleteModal(false)}
        />
      </Footer>
    </Modal>
  );
};

export default DeleteModal;
