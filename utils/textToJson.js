const textToJson = (text) => {
  return JSON.parse(text);
};

const downloadJson = (json) => {
  const blob = new Blob([JSON.stringify(json, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mjai.json";
  a.click();
};

export { textToJson, downloadJson };
