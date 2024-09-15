const apiRequest = async (url, method = "GET", data = null, type = "json") => {
  try {
    const options = {
      method: method,
    };

    if (data) {
      if (type === "json") {
        options.body = JSON.stringify(data);
        options.headers = {
          "Content-Type": "application/json",
        };
      } else if (type === "form") {
        options.body = data;
        // Do not set 'Content-Type', browser will set it to 'multipart/form-data' automatically
      }
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error.message;
  }
};

export default apiRequest;
