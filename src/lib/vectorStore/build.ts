import fs from "fs";
import path from "path";

import { chunkMarkdown, CONFIG } from "./utils";
import { UpstashDocument } from "./type";
import { getStore } from "./store";

function findMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else {
      if (file.endsWith(".md") || file.endsWith(".mdx")) {
        fileList.push(filePath);
      }
    }
  }

  return fileList;
}

(async () => {
  console.log(`🔍 Scanning for content in ${CONFIG.DATA_DIR}...`);
  const markdownFiles = findMarkdownFiles(CONFIG.DATA_DIR);

  const readmePath = path.join(process.cwd(), "README.md");
  if (fs.existsSync(readmePath)) {
    markdownFiles.push(readmePath);
  }

  console.log(`📄 Found ${markdownFiles.length} markdown files`);

  const documents: UpstashDocument[] = [];

  for (const filePath of markdownFiles) {
    const fileName = path.relative(process.cwd(), filePath);

    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const chunks = chunkMarkdown(
        raw,
        {
          source: fileName,
        },
        fileName,
      );

      for (const chunk of chunks) {
        documents.push(chunk);
      }

      console.log(`✓ Processed: ${fileName}`);
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error);
    }
  }

  console.log(
    `🔢 Generated ${documents.length} chunks from ${markdownFiles.length} files`,
  );

  const index = getStore();
  const results = await Promise.allSettled(
    documents.map((document) => index.upsert(document)),
  );

  const successCount = results.filter((r) => r.status === "fulfilled").length;
  console.log(
    `✅ Saved ${successCount}/${documents.length} chunks to Upstash index`,
  );
})();
