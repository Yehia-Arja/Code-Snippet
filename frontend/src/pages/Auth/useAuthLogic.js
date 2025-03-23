import request from "../../utils/remote/axios";
import { useState } from "react";
import { requestMethods } from "../../utils/enum/requestMethods";
import { useNavigate } from "react-router-dom";

const useAuthLogic = () => { 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        content: ""
    });
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const login = async (email,password) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await request({
            method: requestMethods.POST,
            route: "/guest/login",
            body: formData
        });
        setLoading(false);
        if (response.success) {
            setMessage({
                type: "success",
                content: response.message
            });
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        }
        setMessage({
            type: "error",
            content: response.message
        });
        
    };
    const signup = async (name, email, password) => { 
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        const response = await request({
            method: requestMethods.POST,
            route: "/guest/signup",
            body: formData
        });
        setLoading(false);
        if (response.success) {
            setMessage({
                type: "success",
                content: response.message
            });
            navigate("/login");
        }
        setMessage({
            type: "error",
            content: response.message
        });
    }
    return {
        loading,
        message,
        form,
        setForm,
        login,
        signup
    };
}
export default useAuthLogic;