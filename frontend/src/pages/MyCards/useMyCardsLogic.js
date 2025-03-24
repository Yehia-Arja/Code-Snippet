// === File: src/pages/MyCards/useMySnippetsLogic.js ===
import { useEffect, useState } from "react";
import request from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enum/requestMethods";

const useMySnippetsLogic = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSnippets = async () => {
    setLoading(true);
    const res = await request({
      method: requestMethods.GET,
      route: "/code-snippet?{id}",
    });
    if (res.success) setSnippets(res.data);
    setLoading(false);
  };

  const updateSnippet = async (id, updatedData) => {
    const response = await request({
      method: requestMethods.PUT,
      route: `/update-snippet/${id}`,
      body: updatedData,
    });
    if (response.success) {
      setSnippets(response.data);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  return { snippets, loading, updateSnippet };
};

export default useMySnippetsLogic;
