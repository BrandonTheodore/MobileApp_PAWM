document.addEventListener("DOMContentLoaded", () => {
  const runBtn = document.getElementById("runBtn");
  const codeInput = document.getElementById("codeInput");
  const resultOutput = document.getElementById("resultOutput");

  runBtn.addEventListener("click", async () => {
    const code = codeInput.value;
    if (!code.trim()) return alert("Please enter some code.");

    resultOutput.value = "Running code...";

    try {
      // Ensure this matches your Go server address
      const response = await fetch("http://localhost:8000/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }), // Matches your FrontendRequest struct
      });

      const data = await response.json();
      console.log(data); // Helpful for debugging
      document.getElementById("resultOutput").value =
        data.output || data.error || "No output";
      resultOutput.value = data.output || "No output returned.";
    } catch (error) {
      resultOutput.value = "Error: Could not connect to the backend server.";
      console.error(error);
    }
  });
});
