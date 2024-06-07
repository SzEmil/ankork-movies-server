import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_DB_URL!;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});


export async function checkMongoDBHealth() {
  try {
    const client = await MongoClient.connect(uri);
    await client.db("admin").command({ ping: 1 });
    await client.close();
    console.log('[MongoDB]: Połączenie z bazą danych pomyślne');
    return true;
  } catch (err) {
    console.error('[MongoDB]: Błąd połączenia z bazą danych:', err);
    return false;
  }
}