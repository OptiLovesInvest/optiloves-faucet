const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

const TOKEN_MINT = "FyfXRmEYzrWfzdjHXe2LfKQj2syv2rhgkkgKQDSnq8EW"; // Replace with your token
const AMOUNT = "100";

app.post("/faucet", (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).send("Address is required");

  const cmd = `spl-token transfer ${TOKEN_MINT} ${AMOUNT} ${address} --fund-recipient --allow-unfunded-recipient`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) return res.status(500).send(`Error: ${stderr}`);
    res.send(`Success: ${stdout}`);
  });
});

app.listen(3000, () => console.log("🚰 Token faucet listening on port 3000"));
