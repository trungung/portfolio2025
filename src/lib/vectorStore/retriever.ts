import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { CONFIG } from "./utils";

const embeddings = new HuggingFaceTransformersEmbeddings({
  model: CONFIG.EMBEDDING_MODEL,
});
const store = await HNSWLib.load(CONFIG.OUTPUT_DIR, embeddings);

const retriever = store.asRetriever({
  k: CONFIG.K,
});

export { store, retriever };
