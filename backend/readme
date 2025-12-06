# The Agency Project: 01 Health

> A prototype exploring how human agency over health data can be encoded directly into technical architecture.

This project is being developed for the **Agentic Hackathon (SpoonOS + Neo)**.  
The goal is to demonstrate a system in which individuals license the use of their health data for research and computation **without surrendering ownership or control**.

The hackathon demo will be delivered intentionally as a short video rather than a live click-through.

---

## High-Level Architecture

- **SpoonOS** – agentic interface layer  
  - `PatientAgent` – registers datasets, reviews access requests, approves/revokes consent, sets time bounds and heirs.  
  - `ResearcherAgent` – discovers available datasets and submits access requests for specific studies.

- **Neo (N3)** – consent and permissions ledger  
  - Smart contract records:
    - dataset ownership
    - licences (who may use what, for how long, for which purpose)
    - status (PENDING, ACTIVE, REVOKED, EXPIRED)
    - optional heir for post-mortem control

- **Encrypted Off-Chain Storage (NeuroFS-style vault)**  
  - Stores de-identified / mock health datasets.  
  - Only dataset IDs + hashes + minimal metadata are referenced on-chain.  
  - For the hackathon prototype, this is implemented as a simple encrypted/local store with the same access semantics.

- **Backend service (Node/TypeScript)**  
  - Bridges SpoonOS tools with Neo and the vault:
    - `POST /datasets` – register dataset in the vault and on Neo  
    - `POST /licenses/request` – researcher requests a licence  
    - `POST /licenses/approve` – patient approves a licence  
    - `POST /licenses/revoke` – patient revokes a licence  
    - `GET /datasets/:id` – returns mock data only if an ACTIVE licence exists

- **ElevenLabs**  
  - Used for voice synthesis in the video presentation (intro + outro).  
  - The same voice stands in as the “system voice” reading consent requests in the demo.

---

## Current Status (Checkpoint)

- Overall architecture and conceptual framework are **finalised**.
- Mechanisms for:
  - user-controlled data licensing  
  - consent  
  - revocation  
  - time-binding  
  - inheritance  

  are **designed and mapped** into data structures and contract methods.

- SpoonOS:
  - agent roles and flows are defined in `spoonos/agents.yaml`.

- Neo:
  - smart contract skeleton is defined in `contracts/AgencyConsentContract.cs` with methods for
    `registerDataset`, `requestAccess`, `approveAccess`, `revokeAccess`, and `setHeir`.

- Backend:
  - TypeScript service stubs are in place in `backend/app.ts`, `backend/neoClient.ts`, and `backend/vault.ts`.

- Demo:
  - The project demo will be delivered as an intentional **3-minute video** showing:
    1. Philosophical framing (avatar monologue)
    2. Walkthrough of key flows (screen capture of the prototype UI)
    3. Closing reflection and QR code for further exploration.

### Remaining Work

The remaining work for the hackathon is primarily:

- Implementing minimal UI screens to visualise:
  - dataset registration
  - access request + explicit consent
  - revocation
  - time-bound licence display
- Wiring the UI to the existing backend stubs for the purposes of the recorded demo.
- Recording the video (avatar + screen capture) using the already-defined narrative structure.

All conceptual and architectural components are locked; the focus now is on assembling the demonstration layer so it can be captured cleanly for the final presentation.
