import { Client } from "jsr:@bartlomieju/postgres";
import { load } from "jsr:@std/dotenv";

let client: Client | null = null;

export async function getDbClient(): Promise<Client>{
    if(!client){
        try{
            const env = await load({ envPath: "./db/credentials.env" });

            client = new Client({
                hostname: env.DB_HOST,
                port: env.DB_PORT,
                user: env.DB_USER,
                password: env.DB_PASS,
                database: env.DB_NAME,
            });

            await client.connect();
            console.log("connected");
        }
        catch(error){
            console.error("client connection error");
            client = null;
            throw error;
        }
    }
    return client;
}

export async function closeDbClient(){
    if(client){
        try{
            await client.end();
        }
        catch(error){
            console.error("disconnection error", error);
        }
        finally{
            client = null;
        }
    }
}