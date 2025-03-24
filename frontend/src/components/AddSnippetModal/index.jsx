import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useSnippetFormLogic from "./useSnippetFormLogic";
import "./styles.css"; 

const AddSnippetPage = () => {
  const { form, setForm, addSnippet, message, loading } = useSnippetFormLogic();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Add New Snippet</h1>
        <p>Fill in the snippet details below</p>

        <Input label="Title" value={form.title} placeholder="Enter snippet title" onChange={handleChange("title")} />
        <Input label="Description" value={form.description} placeholder="Snippet description" onChange={handleChange("description")} />
        <Input label="Code" value={form.code} placeholder="Your code goes here..." onChange={handleChange("code")} />
        <Input label="Language" value={form.language} placeholder="e.g. JavaScript" onChange={handleChange("language")} />
        <Input label="Tags" value={form.tags} placeholder="Comma separated tags" onChange={handleChange("tags")} />
        <Input label="Keywords" value={form.keywords} placeholder="Comma separated keywords" onChange={handleChange("keywords")} />

        <Button text={loading ? "Adding..." : "Add Snippet"} onClick={()=>addSnippet()} />

        {message.content && (
          <p className={message.type}>{message.content}</p>
        )}
      </div>
    </div>
  );
};

export default AddSnippetPage;
