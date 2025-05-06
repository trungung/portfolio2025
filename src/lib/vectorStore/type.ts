export type Metadata = {
  source: string;
  chunkIndex: number;
  headings: string[];
  [key: string]: unknown;
};

export type UpstashDocument = {
  id: string;
  data: string;
  metadata: Metadata;
};
