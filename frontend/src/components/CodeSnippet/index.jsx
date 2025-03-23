const CodeSnippet = () => {
    const code = {title:'Java', description:'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.', name:'Java'};
    return (
        <div>
            <div>
                {code.title}
            </div>
            <div>
                {code.description}
            </div>
            <div>
                {code.name}
            </div>
        </div>
    )
}
export default CodeSnippet;