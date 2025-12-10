// lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

declare global {
  // allow caching on global in dev to avoid multiple clients
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME!;

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
if (!MONGODB_DB_NAME) throw new Error("Missing MONGODB_DB_NAME");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In dev, use global cache to avoid creating many connections during HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClient = client;
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
  client = global._mongoClient!;
} else {
  // In production, one client instance is fine
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

/**
 * Returns { client, db } - call this before any DB operation
 */
export async function connectToDB(): Promise<Db> {
  const connectedClient = await clientPromise;
  const db = connectedClient.db(MONGODB_DB_NAME);
  console.log("MongoDB connected");
  return db;
}
