// backend/app.ts
// Minimal Node/Express-style API skeleton to bridge SpoonOS tools,
// Neo consent contract, and the off-chain vault.

import express from "express";
import { registerDatasetOnChain, requestAccessOnChain, approveAccessOnChain, revokeAccessOnChain } from "./neoClient";
import { saveDatasetToVault, getDatasetFromVault } from "./vault";

const app = express();
app.use(express.json());

// POST /datasets
// Registers a new dataset in the vault and records a reference on Neo.
app.post("/datasets", async (req, res) => {
  try {
    const { ownerAddress, metadata } = req.body;
    // In a real system, `data` would be an encrypted blob or NeuroFS reference.
    const { vaultId, hash } = await saveDatasetToVault(metadata);

    const txHash = await registerDatasetOnChain({
      owner: ownerAddress,
      datasetId: vaultId,
      metadataHash: hash,
    });

    res.json({ datasetId: vaultId, txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register dataset" });
  }
});

// POST /licenses/request
app.post("/licenses/request", async (req, res) => {
  try {
    const { researcherAddress, datasetId, paymentAmount, startTime, endTime } = req.body;

    const txHash = await requestAccessOnChain({
      researcher: researcherAddress,
      datasetId,
      paymentAmount,
      startTime,
      endTime,
    });

    res.json({ txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to request access" });
  }
});

// POST /licenses/approve
app.post("/licenses/approve", async (req, res) => {
  try {
    const { ownerAddress, licenseId } = req.body;

    const txHash = await approveAccessOnChain({
      owner: ownerAddress,
      licenseId,
    });

    res.json({ txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to approve access" });
  }
});

// POST /licenses/revoke
app.post("/licenses/revoke", async (req, res) => {
  try {
    const { ownerAddress, licenseId } = req.body;

    const txHash = await revokeAccessOnChain({
      owner: ownerAddress,
      licenseId,
    });

    res.json({ txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to revoke access" });
  }
});

// GET /datasets/:id
// For demo purposes only: returns mock data if an ACTIVE licence exists.
app.get("/datasets/:id", async (req, res) => {
  try {
    const datasetId = req.params.id;

    // TODO: check Neo contract for at least one ACTIVE licence
    // for the calling researcher (omitted in this stub).

    const data = await getDatasetFromVault(datasetId);
    res.json({ datasetId, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch dataset" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Agency Project backend listening on port ${PORT}`);
});
