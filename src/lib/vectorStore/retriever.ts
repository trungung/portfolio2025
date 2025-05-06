import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";

import { Index } from "@upstash/vector";
import { CONFIG } from "./utils";

const embeddings = new HuggingFaceTransformersEmbeddings({
  model: CONFIG.EMBEDDING_MODEL,
});
const indexWithCredentials = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

const store = new UpstashVectorStore(embeddings, {
  index: indexWithCredentials,
});

const retriever = store.asRetriever({
  k: CONFIG.K,
});

export { store, retriever };
