import { Index } from "@upstash/vector";
import { Metadata } from "./type";
import dotenv from "dotenv";
dotenv.config();

export const getStore = () => {
  const index = new Index<Metadata>({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });

  return index;
};
