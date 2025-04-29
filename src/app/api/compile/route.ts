export const POST = async (req: Request) => {
  try {
    const { code, language, input } = await req.json();
    const url = "https://api.jdoodle.com/v1/execute";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
        script: code,
        stdin: input,
        language: language,
        versionIndex: "0",
        compileOnly: false,
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      return Response.json(
        {
          success: true,
          data: data,
        },
        {
          status: 200,
        },
      );
    } else {
      return Response.json(
        {
          success: false,
          message: data.message,
        },
        {
          status: 400,
        },
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "An error occurred while processing your request: " + error,
      },
      {
        status: 500,
      },
    );
  }
};
