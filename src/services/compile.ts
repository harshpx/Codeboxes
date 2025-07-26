export const compile = async (
  code: string,
  language: string,
  input: string,
) => {
  // const url: string = "https://codeboxes.152.42.158.94.nip.io/api/v1/execute";
  const url: string = "http://localhost:8080/api/v1/execute";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      language,
      input,
    }),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(
      data.message || "An error occurred while compiling the code",
    );
  }
};
