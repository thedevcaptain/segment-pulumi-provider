import * as fs from "fs";
import axios, { AxiosInstance } from "axios";

let clientInstance: AxiosInstance;

export const getEnv = (path: string) => {
  if (fs.existsSync(path)) {
    const dotenv = require("dotenv").config({ path: path });
    return dotenv.parsed;
  }

  return {};
};

export const getSegmentClient = (opts?: any) => {
  const { SEGMENT_ACCESS_TOKEN } = process.env;
  if (!SEGMENT_ACCESS_TOKEN)
    throw Error("Missing SEGMENT_ACCESS_TOKEN env variable");

  if (!clientInstance) {
    clientInstance = axios.create({
      baseURL: "https://platform.segmentapis.com/v1beta",
      headers: {
        Authorization: `Bearer ${SEGMENT_ACCESS_TOKEN}`,
      },
    });
  }
  return clientInstance;
};
