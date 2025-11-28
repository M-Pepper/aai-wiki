# Todo: Implement AI Chat (RAG)

A plan to build a "Chat with your Docs" feature using the Cloudflare stack (Pages, Vectorize, Workers AI).

## Phase 1: Infrastructure Setup (Cloudflare)
- [ ] **Create Vectorize Index:** Set up a vector database on Cloudflare to store document embeddings.
- [ ] **Enable Workers AI:** Ensure the project has access to embedding models (e.g., `bge-base-en-v1.5`) and generation models (e.g., `llama-3-8b-instruct`).
- [ ] **Configure Bindings:** Update `wrangler.toml` to bind the Vectorize index and AI service to the Pages project.

## Phase 2: Data Ingestion Pipeline
- [ ] **Ingestion Script:** Create a Node.js script to:
    - Read all `.mdx` files in `docs/`.
    - Strip frontmatter and separate content into meaningful chunks (e.g., by H2/H3 headers).
    - Generate embeddings for each chunk using Cloudflare Workers AI (or OpenAI compatible API if running locally).
    - Upsert vectors + metadata (content, URL, title) to the Vectorize index.
- [ ] **CI/CD Integration:** Add this script to the build pipeline (or a separate GitHub Action) to update the index on every commit.

## Phase 3: Backend API (Pages Function)
- [ ] **Create Endpoint:** `functions/api/chat.ts`.
- [ ] **Implement Retrieval:**
    - Receive user query.
    - Generate embedding for query.
    - Query Vectorize index for top 3-5 matching chunks.
- [ ] **Implement Generation:**
    - Construct a system prompt ("You are a medical assistant... use this context...").
    - Send prompt + context + query to Workers AI (Llama 3).
    - Return the response (streaming preferred).

## Phase 4: Frontend UI (Docusaurus)
- [ ] **Chat Component:** Build a floating "Chat" button/widget (React).
- [ ] **Chat Window:** Create the interface for input and displaying messages.
- [ ] **State Management:** Handle loading states, streaming responses, and error handling.
- [ ] **Integration:** Add the component to `Layout` or footer via Docusaurus swizzling or a custom plugin.

## Phase 5: Polish & Safety
- [ ] **Medical Disclaimer:** Ensure the AI output always includes or is preceded by a disclaimer.
- [ ] **Rate Limiting:** Protect the API endpoint.
- [ ] **Testing:** Verify accuracy on key clinical topics.
