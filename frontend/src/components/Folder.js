// src/components/Folder.js
import React, { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import File from "./File"; // Ensure this path is correct
import api from "../api/api";

const Folder = ({
  folder,
  onRefresh,
  onCreateItem,
  setShowInput,
  setNewItemName,
  setIsCreatingFolder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);

  const toggleFolder = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRename = async () => {
    if (newName.trim() === "") return;
    try {
      await api.renameFile(folder._id, newName);
      setIsRenaming(false);
      onRefresh(); // Refresh directory structure
    } catch (error) {
      console.error("Error renaming folder:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteFile(folder._id);
      onRefresh(); // Refresh directory structure
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleCreateInFolder = () => {
    onCreateItem(folder._id); // Set parent folder ID for creating new items
    setShowInput(true); // Show input field for creating an item
    setNewItemName(""); // Clear input field
    setIsCreatingFolder(true); // Default to creating a folder (can change later)
  };

  const uniqueChildren = (children) => {
    const seenIds = new Set();
    return children.filter((child) => {
      if (seenIds.has(child._id)) return false;
      seenIds.add(child._id);
      return true;
    });
  };

  return (
    <div className="folder-item" style={{ position: "relative" }}>
      <div
        onClick={toggleFolder}
        style={{ display: "flex", alignItems: "center", cursor: "pointer", gap:"16px" }}
      >
        {isOpen ? <FaFolderOpen /> : <FaFolder />}
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
            {folder.name}
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCreateInFolder(); // Handle creating inside this folder
              }}
            >
              New Item
            </button>
          </>
        )}
      </div>
      {isOpen &&
        Array.isArray(folder.children) &&
        folder.children.length > 0 && (
          <div className="folder-contents" style={{ paddingLeft: 20 }}>
            {folder.children &&
              uniqueChildren(folder.children).map((item) =>
                item.type === "file" ? (
                  <File key={item._id} file={item} onRefresh={onRefresh} />
                ) : (
                  <Folder
                    key={item._id}
                    folder={item}
                    onRefresh={onRefresh}
                    onCreateItem={onCreateItem}
                    setShowInput={setShowInput}
                    setNewItemName={setNewItemName}
                    setIsCreatingFolder={setIsCreatingFolder}
                  />
                )
              )}
          </div>
        )}
    </div>
  );
};

export default Folder;
