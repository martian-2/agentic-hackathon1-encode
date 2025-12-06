// backend/neoClient.ts
// Stubbed Neo client – here we just describe the interface and
// leave actual SDK wiring as TODOs for the hackathon implementation.

type RegisterDatasetArgs = {
  owner: string;
  datasetId: string;
  metadataHash: string;
};

type RequestAccessArgs = {
  researcher: string;
  datasetId: string;
  paymentAmount: string;
  startTime: number;
  endTime: number;
};

type ApproveAccessArgs = {
  owner: string;
  licenseId: number;
};

type RevokeAccessArgs = {
  owner: string;
  licenseId: number;
};

export async function registerDatasetOnChain(args: RegisterDatasetArgs): Promise<string> {
  // TODO: call Neo contract `registerDataset`
  console.log("registerDatasetOnChain", args);
  return "0x-registerDataset-txhash";
}

export async function requestAccessOnChain(args: RequestAccessArgs): Promise<string> {
  // TODO: call Neo contract `requestAccess`
  console.log("requestAccessOnChain", args);
  return "0x-requestAccess-txhash";
}

export async function approveAccessOnChain(args: ApproveAccessArgs): Promise<string> {
  // TODO: call Neo contract `approveAccess`
  console.log("approveAccessOnChain", args);
  return "0x-approveAccess-txhash";
}

export async function revokeAccessOnChain(args: RevokeAccessArgs): Promise<string> {
  // TODO: call Neo contract `revokeAccess`
  console.log("revokeAccessOnChain", args);
  return "0x-revokeAccess-txhash";
}
