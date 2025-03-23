import "./styles.css";
const Input = ({ placeholder, label, type, value, onChange }) => { 
    return (
        <div className="input-wrapper">
            <div className="input-container">
                <label>{label}</label>
                <input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
export default Input;