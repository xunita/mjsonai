const getAssistantResponse = (prompt) => {
  const promptData = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: prompt,
        },
      ],
    },
  ];
  const config = useRuntimeConfig();
  const ASSSISTANT_BACKEND_ENDPOINT =
    process.env.NODE_ENV === "development"
      ? config.public.ASSISTANT_ENDPOINT_DEV
      : config.public.ASSISTANT_ENDPOINT_PROD;
  //
  return new Promise((resolve, reject) => {
    fetch(ASSSISTANT_BACKEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        reject(new Error("Server error"));
      })
      .then((responseJson) => {
        resolve(responseJson.data);
      })
      .catch((error) => {
        reject(new Error(error.message));
      });
  });
};

export { getAssistantResponse };
