import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export async function connectToDB(): Promise<Db> {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    db = client.db(process.env.MONGODB_DB_NAME!);
    console.log("Connected to MongoDB:", db.databaseName);
  }
  return db;
}
