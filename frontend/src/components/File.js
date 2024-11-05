
import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import api from "../api/api";

const File = ({ file, onRefresh }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);

  // Rename file
  const handleRename = async () => {
    if (newName.trim() === "") return;
    try {
      await api.renameFile(file._id, newName);
      setIsRenaming(false);
      onRefresh(); // Fetch updated structure
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  // Delete file
  const handleDelete = async () => {
    try {
      await api.deleteFile(file._id);
      onRefresh(); // Fetch updated structure
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="file-item" style={{ display: "flex", alignItems: "center", gap:"16px" }}>
      <FaFileAlt />
      {isRenaming ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            autoFocus
          />
          <button onClick={handleRename}>Save</button>
          <button onClick={() => setIsRenaming(false)}>Cancel</button>
        </>
      ) : (
        <>
          {file.name}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
            }}
          >
            Rename
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default File;
