// === File: src/components/CodeSnippet/index.jsx ===
import "./styles.css";

const CodeSnippet = ({ snippet, editable = false, onEdit }) => {
  return (
    <div className="snippet-card">
      <div className="snippet-header">
        <h2 className="snippet-title">{snippet.title}</h2>
        <span className="snippet-language">{snippet.language}</span>
      </div>

      <div className="snippet-description">
        <p>{snippet.description}</p>
      </div>

      <div>
        <pre className="snippet-code">{snippet.code}</pre>
      </div>

      <div className="snippet-tags">
        {snippet.tag_names?.map((tag, index) => (
          <span key={index} className="snippet-tag">
            {tag}
          </span>
        ))}
      </div>

      {editable && (
        <div className="snippet-actions">
          <button onClick={() => onEdit(snippet)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;
