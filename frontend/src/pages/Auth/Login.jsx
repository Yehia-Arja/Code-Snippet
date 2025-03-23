import useAuthLogic from "./useAuthLogic";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import "./styles.css";
const Login = () => { 
    const { form, setForm, login, loading, message } = useAuthLogic();

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Login</h1>
                <p>Enter your credentials to access your account</p>
                <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    placeholder="johndoe@example.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                    label="Password"
                    type="password"
                    value={form.password}
                    placeholder="••••••••"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                
                <Button text="L O G I N" onClick={() => login(form.email, form.password)} />
                <div className="link-container">
                    <span>Don't have an account? </span>
                    <Link to="/register" className="link">
                        Create now
                    </Link>
                </div>
                {loading ? (
                    <p className="loading-text">Loading...</p>
                ) : message.content ? (
                    <p className={message.type}>{message.content}</p>
                ) : null }
            </div>
        </div>
    );
}

export default Login;
