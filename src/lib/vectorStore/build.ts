import fs from "fs";
import path from "path";

import { chunkMarkdown, CONFIG } from "./utils";
import { UpstashDocument } from "./type";
import { getStore } from "./store";

(async () => {
  const files = fs.readdirSync(CONFIG.DATA_DIR);
  const documents: UpstashDocument[] = [];
  for (const file of files) {
    if (!file.endsWith(".md") || file.startsWith(".")) continue;
    const raw = fs.readFileSync(path.join(CONFIG.DATA_DIR, file), "utf8");
    const chunks = chunkMarkdown(raw, file);
    for (const chunk of chunks) {
      documents.push(chunk);
    }
  }
  const index = getStore();
  await Promise.allSettled(documents.map((document) => index.upsert(document)));
  console.log("✅ Saved Upstash index");
})();
