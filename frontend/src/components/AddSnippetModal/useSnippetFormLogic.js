import { useState } from "react";
import request from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enum/requestMethods";

const useAuthLogic = () => { 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        content: ""
    });
    const [form, setForm] = useState({
        title: "",
        description: "",
        code: "",
        tags: "",
        language: "",
        keywords: "",
    });

    const addSnippet = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("code", form.code);
        formData.append("tags", form.tags);
        formData.append("language", form.language);
        formData.append("keywords", form.keywords);

        const response = await request({
            method: requestMethods.POST,
            route: "/add-snippet",
            body: formData
        });
        setLoading(false);
        if (response.success) {
            setMessage({
                type: "success",
                content: response.message
            });
            return;
        }
        setMessage({
            type: "error",
            content: response.message
        });
        
    };
 
    return { loading, message, form, setForm, addSnippet};
}
export default useAuthLogic;