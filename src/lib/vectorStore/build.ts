import fs from "fs";
import path from "path";

import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import type { Document } from "@langchain/core/documents";
import { chunkMarkdown, CONFIG } from "./utils";

(async () => {
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: CONFIG.EMBEDDING_MODEL,
  });
  const store = await HNSWLib.fromDocuments([], embeddings);
  const files = fs.readdirSync(CONFIG.DATA_DIR);
  const docs: Document[] = [];
  for (const file of files) {
    if (!file.endsWith(".md") || file.startsWith(".")) continue;
    const raw = fs.readFileSync(path.join(CONFIG.DATA_DIR, file), "utf8");
    const chunks = chunkMarkdown(raw, file);
    for (const chunk of chunks) {
      docs.push(chunk);
    }
  }

  await store.addDocuments(docs);
  if (!fs.existsSync(CONFIG.OUTPUT_DIR))
    fs.mkdirSync(CONFIG.OUTPUT_DIR, { recursive: true });
  await store.save(CONFIG.OUTPUT_DIR);

  console.log("✅ Saved HNSW index to", CONFIG.OUTPUT_DIR);
})();
