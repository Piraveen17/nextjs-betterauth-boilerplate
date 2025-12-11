// lib/mongodb.ts
import mongoose, { Connection } from "mongoose";
import { MongoClient, Db } from "mongodb";
import { ca } from "zod/v4/locales";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");
if (!MONGODB_DB_NAME) throw new Error("MONGODB_DB_NAME is missing");

declare global {
  var __mongoClient__: MongoClient | undefined;
  var __mongoDB__: Db | undefined;
  var __mongooseConn__: Connection | undefined;
}

/** Return MongoDB Database (for BetterAuth or raw queries) */
export async function getMongoDB(): Promise<Db> {
  if (global.__mongoDB__) return global.__mongoDB__;

  let client: MongoClient;
  if (global.__mongoClient__) {
    client = global.__mongoClient__;
  } else {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    global.__mongoClient__ = client;
    console.log("MongoClient connected");
  }

  const db = client.db(MONGODB_DB_NAME);
  global.__mongoDB__ = db;

  console.log(`MongoDB database selected: ${MONGODB_DB_NAME}`);
  return db;
}

/** Return Mongoose Connection using the same MongoClient */
export async function connectToDB() {
  // Build full URI with database
  try {
    const uriWithDb = `${MONGODB_URI}/${MONGODB_DB_NAME}`;

    await mongoose.connect(uriWithDb);
    global.__mongooseConn__ = mongoose.connection;

    console.log(`Mongoose connected to database: ${MONGODB_DB_NAME}`);
  } catch (error) {
    console.log(error);
  }
}
