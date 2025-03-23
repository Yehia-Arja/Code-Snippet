import useAuthLogic from "./useAuthLogic";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import "./styles.css";

const Signup = () => { 
    const { form, setForm, signup, loading, message } = useAuthLogic();

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Sign Up</h1>
                <p>Create your account</p>
                <Input
                    label="Name"
                    type="text"
                    value={form.name}
                    placeholder="John Doe"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
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
                <Button text="Signup" onClick={() => signup(form.name,form.email,form.password)} />
                <div className="link-container">
                    <span>Already have an account? </span>
                    <Link to="/login" className="link">
                        Login now
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

export default Signup;
