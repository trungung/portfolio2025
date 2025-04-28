import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";

let model: FeatureExtractionPipeline | null = null;

export async function embedText(text: string): Promise<Record<string, number>> {
  if (!model) {
    model = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  const output = await model(text, { pooling: "mean", normalize: true });
  const embedding = output.data as number[];

  const result: Record<string, number> = {};
  embedding.forEach((value, index) => {
    result[index.toString()] = value;
  });

  return result;
}
