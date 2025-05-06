import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";

import { Index } from "@upstash/vector";
import type { Document } from "@langchain/core/documents";
import { chunkMarkdown, CONFIG } from "./utils";

(async () => {
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: CONFIG.EMBEDDING_MODEL,
  });
  const indexWithCredentials = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  await indexWithCredentials.reset();

  const store = new UpstashVectorStore(embeddings, {
    index: indexWithCredentials,
  });

  const files = fs.readdirSync(CONFIG.DATA_DIR);
  const docs: Document[] = [];
  for (const file of files) {
    if (!file.endsWith(".md") || file.startsWith(".")) continue;
    const raw = fs.readFileSync(path.join(CONFIG.DATA_DIR, file), "utf8");
    const chunks = chunkMarkdown(raw, file);
    console.log(`Chunking ${file} into ${chunks.length} chunks`);
    for (const chunk of chunks) {
      docs.push(chunk);
    }
  }

  await store.addDocuments(docs);

  console.log("✅ Saved Upstash index");
})();
