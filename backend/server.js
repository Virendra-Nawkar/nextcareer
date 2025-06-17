import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from test server!");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
