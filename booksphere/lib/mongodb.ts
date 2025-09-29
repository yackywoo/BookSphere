import { MongoClient, Db } from 'mongodb';
import { config } from '../config/env';

const MONGODB_URI = config.mongodb.uri;
const MONGODB_DB = config.mongodb.db;

let cached: { conn: { client: MongoClient; db: Db } | null; promise: Promise<{ client: MongoClient; db: Db }> | null } | undefined = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = MongoClient.connect(MONGODB_URI).then((client: MongoClient) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  const result = await cached!.promise;
  cached!.conn = result;
  return result;
}

// User schema interface
export interface User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

// Global type declaration for mongo cache
declare global {
  var mongo: {
    conn: { client: MongoClient; db: Db } | null;
    promise: Promise<{ client: MongoClient; db: Db }> | null;
  } | undefined;
}
