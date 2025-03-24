import React from "react";
import "./styles.css";

const EditSnippetCard = ({ form, setForm, onSave, loading }) => {
  return (
    <div className="edit-snippet-card">
      <h2>Edit Snippet</h2>

      <label>Title</label>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <label>Description</label>
      <textarea
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <label>Code</label>
      <textarea
        rows={8}
        value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
      />

      <label>Language</label>
      <input
        type="text"
        value={form.language}
        onChange={(e) => setForm({ ...form, language: e.target.value })}
      />

      <label>Tags (comma separated)</label>
      <input
        type="text"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />

      <label>Keywords (comma separated)</label>
      <input
        type="text"
        value={form.keywords}
        onChange={(e) => setForm({ ...form, keywords: e.target.value })}
      />

      <button onClick={onSave} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditSnippetCard;
