const JDOODLE_ENDPOINT = "https://api.jdoodle.com/v1/execute";

const CLIENT_ID = "1a4855f8bf9e6a1fd94efca71d043d1c";
const CLIENT_SECRET =
  "26af65a1df0d0d0132cfe5f85d25c497d3939cc6dd0103586842dff19e92bbe6";

export const executePythonCode = async (scriptContent) => {
  try {
    console.log("Sending Python code to JDoodle...");

    const response = await fetch(JDOODLE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        script: scriptContent,
        language: "python3",
        versionIndex: "4",
      }),
    });

    const data = await response.json();

    if (data.statusCode === 200) {
      return data.output; // The actual print() output from Python
    } else {
      console.error("JDoodle Error:", data);
      return `Error: ${data.error || "Quota limit or syntax error"}`;
    }
  } catch (error) {
    console.error("Network Error:", error);
    return "Failed to connect to JDoodle. Check your internet.";
  }
};
