import { useState, useEffect } from "react";
import request from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enum/requestMethods";

const useHomeLogic = (searchValue) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);

  const queryType = searchValue.trim().startsWith("#") ? "tag" : "keyword";
  const queryValue = searchValue.trim().startsWith("#")
    ? searchValue.trim().substring(1)
    : searchValue.trim();

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      const route = queryValue
        ? `/code-snippets?${queryType}=${encodeURIComponent(queryValue)}`
        : "/code-snippets";

      const response = await request({
        method: requestMethods.GET,
        route,
      });

      if (response.success) {
        setSnippets(response.data);
      }
      setLoading(false);
    };

    fetchSnippets();
  }, [searchValue]);

  return { snippets, loading };
};

export default useHomeLogic;

