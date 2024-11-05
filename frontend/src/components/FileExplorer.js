import React, { useEffect, useState } from "react";
import api from "../api/api";
import Folder from "./Folder";
import File from "./File";

function FileExplorer() {
  const [directory, setDirectory] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(true);
  const [parentFolderId, setParentFolderId] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const fetchDirectory = async () => {
    try {
      const response = await api.getFiles();
      setDirectory(response.data);
    } catch (error) {
      console.error("Error fetching directory:", error);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  const handleCreateItem = async () => {
    if (!newItemName.trim()) return;
    try {
      const type = isCreatingFolder ? "folder" : "file";
      await api.createFile({
        name: newItemName,
        type,
        parentId: parentFolderId,
      });
      setNewItemName("");
      setParentFolderId(null);
      setShowInput(false);
      fetchDirectory();
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <button
          onClick={() => {
            setIsCreatingFolder(true);
            setParentFolderId(null);
            setShowInput(true);
          }}
        >
          New Folder
        </button>
        <button
          onClick={() => {
            setIsCreatingFolder(false);
            setParentFolderId(null);
            setShowInput(true);
          }}
        >
          New File
        </button>
      </div>
      {showInput && (
        <div className="input-container">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={
              isCreatingFolder ? "Enter folder name" : "Enter file name"
            }
          />
          <button onClick={handleCreateItem}>Create</button>
          <button onClick={() => setShowInput(false)}>Cancel</button>
        </div>
      )}
      <div className="directory-contents">
        {directory.length > 0 ? (
          directory.map((item) =>
            item.type === "folder" ? (
              <Folder
                key={item._id}
                folder={item}
                onRefresh={fetchDirectory}
                onCreateItem={setParentFolderId}
                setShowInput={setShowInput}
                setNewItemName={setNewItemName}
                setIsCreatingFolder={setIsCreatingFolder}
              />
            ) : (
              <File key={item._id} file={item} onRefresh={fetchDirectory} />
            )
          )
        ) : (
          <p className="empty-message">No files or folders found.</p>
        )}
      </div>
    </div>
  );
}

export default FileExplorer;

