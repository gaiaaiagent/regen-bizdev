# Data Anchoring Walkthrough: UK Biodiversity Survey → Regen Ledger

## Input Data

**Source:** `uk-restoration-biodiversity-survey.json` — Oakwood Manor Restoration Site, Somerset, UK
**Methodology:** Wallacea Trust v2.1
**Survey Date:** 2025-09-15
**Composite Score:** 56.2 (baseline: 31.8, +76.7% change)

This walkthrough demonstrates how Renew's biodiversity survey data flows from field collection to on-chain verifiable record using Regen Ledger's `regen/data/v1` module.

## Step 1: Content Hashing

The survey JSON is the raw ecological data artifact. Regen's data module supports two anchoring modes:

- **Raw data (non-canonical):** The JSON file as-is gets hashed using a secure content hash. This is the simplest path for structured field survey data.
- **Graph data (RDF):** If the data conforms to the RDF data model, it receives a canonicalized hash. Useful for linked data interoperability but not required for initial anchoring.

**For Renew's biodiversity survey:**

```
Input:  uk-restoration-biodiversity-survey.json (raw JSON, ~2KB)
Hash:   ContentHash_Raw { hash: <SHA-256 digest>, digest_algorithm: DIGEST_ALGORITHM_BLAKE2B_256, media_type: RAW_MEDIA_TYPE }
Output: Content hash identifier (e.g., regen:13toV...)
```

The content hash is deterministic — anyone with the original JSON file can recompute the hash and verify it matches the on-chain record. This is the foundation of data integrity.

*Source: Regen data module spec — KOI RID `regen.github:github_regen-ledger_x_data_spec_README.md#chunk1`*

## Step 2: Anchoring via `MsgAnchorData`

The content hash is submitted to Regen Ledger via the `MsgAnchorData` transaction. This creates an immutable on-chain record:

```protobuf
// regen/data/v1/tx.proto
message MsgAnchorData {
  // sender is the account address of the anchoring party
  string sender = 1;

  // content_hash is the content hash for the data to anchor
  ContentHash content_hash = 2;
}
```

**What gets stored on-chain:**
- Content hash (the fingerprint of the survey data)
- Timestamp (block time when anchored)
- Sender address (Renew's Regen account)

**What does NOT go on-chain:**
- The survey data itself (stays off-chain, hosted by Renew or a resolver)
- Taxa details, species lists, or scores (referenced via the content hash)

This separation is intentional — the chain stores proof, not payload. The survey data can be 2KB or 200MB; the on-chain footprint is the same.

*Source: Regen data module documentation — KOI RID `orn:web.page:docs.regen.network/6280734ec9e72b3b#chunk1`, URL: https://docs.regen.network/modules/data*

## Step 3: Attestation via `MsgAttest`

After anchoring, Renew signs an attestation — a formal statement that the data is accurate and represents actual field observations. Attestation on Regen is described as "like signing a legal document."

```protobuf
// regen/data/v1/tx.proto
message MsgAttest {
  // attestor is the account address of the attestor
  string attestor = 1;

  // content_hashes are the content hashes for the data being attested
  repeated ContentHash.Graph content_hashes = 2;
}
```

**Attestation creates:**
- A signed on-chain record linking the attestor's identity to the data
- A timestamp of when the attestation was made
- An immutable audit trail — once attested, the record cannot be altered or removed

**Who attests for Renew's data:**
1. **Renew (data collector):** "We collected this survey data at Oakwood Manor on 2025-09-15 using Wallacea Trust v2.1 methodology"
2. **Independent verifier (e.g., BFI):** "We reviewed this data and confirm it meets quality standards" — this is a separate attestation on the same content hash

Multiple parties can attest to the same content hash, creating a chain of verification.

*Source: Architecture.tex reference on attestation mechanics — KOI RID `regen.youtube:P2r0jrrybfI`*

## Step 4: Metadata IRI Resolution

The anchored data receives a metadata IRI (Internationalized Resource Identifier) that serves as a permanent, resolvable reference:

```
Metadata IRI:  regen:13toV... (content-addressed identifier)
Resolver:      api.regen.network
Resolution:    IRI → off-chain content with content hash verification
```

**How resolution works:**
1. Any party queries `api.regen.network` with the metadata IRI
2. The resolver returns the off-chain content (the original survey JSON)
3. The requester computes the content hash of the returned data
4. The computed hash is compared against the on-chain anchored hash
5. If they match → data integrity confirmed. If not → data has been tampered with.

This is the "trust infrastructure" that Renew asked for. The IRI is a permanent, verifiable pointer to the ecological data.

## Step 5: Third-Party Verification (BFI Workflow)

Here's how a third party like BFI can independently verify Renew's biodiversity claims:

```
BFI Verification Workflow
─────────────────────────

1. DISCOVER
   BFI receives the metadata IRI for Oakwood Manor survey
   (e.g., from Renew's credit listing or project page)

2. RESOLVE
   BFI queries: api.regen.network/regen:13toV...
   → Receives the original biodiversity survey JSON

3. VERIFY INTEGRITY
   BFI computes content hash of received JSON
   → Compares against on-chain anchored hash
   → Match confirms: data hasn't been altered since anchoring

4. REVIEW ATTESTATIONS
   BFI queries on-chain attestation records:
   → Renew attested on [date] (data collector attestation)
   → [Verifier] attested on [date] (if previous verification exists)

5. VERIFY CONTENT
   BFI reviews the actual survey data:
   → 5 taxa groups assessed
   → Composite score 56.2 (76.7% improvement from baseline 31.8)
   → Conservation-weighted scoring per Wallacea Trust v2.1

6. ATTEST (optional)
   BFI can add their own attestation:
   MsgAttest { attestor: <BFI address>, content_hash: <same hash> }
   → Creates on-chain record: "BFI independently verified this data"
```

**Key properties:**
- **No trust required in Renew:** BFI can verify independently — the chain is the source of truth for data integrity
- **No trust required in Regen:** The content hash verification is cryptographic — anyone can run it
- **Composable verification:** Multiple attestors build cumulative trust. Institutional investors can see who verified what and when
- **Temporal proof:** On-chain timestamps prove data was collected and anchored at specific times, preventing backdating

## Data Flow Summary

```
Renew Field Survey          Renew Platform              Regen Ledger              Third Parties
─────────────────          ──────────────              ────────────              ─────────────

5-taxa field data    →     Process & QA         →     MsgAnchorData        →    Resolve IRI
  (AudioMoth,              (composite score,          (content hash             (verify hash,
   pitfall traps,           conservation               on-chain +                review
   territory maps,          weighting,                  timestamp)                attestations)
   botanical survey)        JSON output)                    │
                                                            ↓
                                                      MsgAttest              →    MsgAttest
                                                      (Renew signs               (BFI adds
                                                       as data                    independent
                                                       collector)                 verification)
                                                            │
                                                            ↓
                                                      Credit Batch           →    Marketplace
                                                      (BT01 issuance             (trade,
                                                       references                 retire,
                                                       anchored data)             track)
```

## Connection to Credit Issuance

The anchored and attested survey data becomes the evidence package for credit batch issuance:

1. **Project registration** — Oakwood Manor registered as a project under BT01 credit class
2. **Monitoring period** — Survey data collected per Wallacea Trust v2.1 schedule (biennial)
3. **Data anchoring** — Survey JSON anchored on-chain (this walkthrough)
4. **Verification** — Third-party attestation added (BFI or accredited verifier)
5. **Credit issuance** — `MsgCreateBatch` issued under BT01, metadata IRI references the anchored survey data
6. **Marketplace** — Credits tradeable, retirable, with full provenance chain back to field data

Sources:
- Regen data module spec: KOI RID `regen.github:github_regen-ledger_x_data_spec_README.md#chunk1`
- Data module overview: KOI RID `orn:web.page:docs.regen.network/6280734ec9e72b3b#chunk1`, URL: https://docs.regen.network/modules/data
- Data anchoring example: KOI RID `regen.github:github_regen-ledger_images_regen-sandbox_setup_data.sh#chunk0`
- Ecocredit concepts: KOI RID `regen.github:github_regen-ledger_x_ecocredit_spec_01_concepts.md#chunk0`
