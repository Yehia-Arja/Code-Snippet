// === File: src/pages/MyCards/index.jsx ===
import React, { useState } from "react";
import useMySnippetsLogic from "./useMySnippetsLogic";
import CodeSnippet from "../../components/CodeSnippet";
import EditSnippetCard from "../../components/EditSnippetCard"; 

const MyCards = () => {
  const { snippets, loading, updateSnippet } = useMySnippetsLogic();
  const [editingSnippet, setEditingSnippet] = useState(null);

  const handleEditClick = (snippet) => {
    setEditingSnippet(snippet);
  };

  const handleSave = async (updatedData) => {
    await updateSnippet(editingSnippet.id, updatedData);
    setEditingSnippet(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="snippet-list">
      {editingSnippet ? (
        <EditSnippetCard
          form={editingSnippet}
          setForm={setEditingSnippet}
          onSave={() => handleSave(editingSnippet)}
        />
      ) : (
        snippets.map((snippet) => (
          <CodeSnippet
            key={snippet.id}
            snippet={snippet}
            editable={true}
            onEdit={handleEditClick}
          />
        ))
      )}
    </div>
  );
};

export default MyCards;
