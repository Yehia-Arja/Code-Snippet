import React from "react";
import useHomeLogic from "./useHomeLogic";
import CodeSnippet from "../../components/CodeSnippet";
import AddSnippetModal from "../../components/AddSnippetModal";
import "./styles.css";

const Home = ({ searchValue }) => {
    const { snippets, loading } = useHomeLogic(searchValue);

    if (loading) return <p className="loading-text">Loading...</p>;

    return (
        <>
        <h1 className="home-title">Code Snippets</h1>
        <p>Explore and learn from the code snippets shared by the community</p>
        <div className="snippet-list">
            {snippets.map((snippet) => (
            <CodeSnippet key={snippet.id} snippet={snippet} />
            ))}
        </div>
        </>
    );
};

export default Home;
