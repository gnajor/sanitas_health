import { QueryArrayResult } from "jsr:@bartlomieju/postgres";
import { getDbClient, closeDbClient } from "../db/db_com.ts";

export async function handleRequests(request: Request): Promise<Response>{
    const url = new URL(request.url);
    const patientKeys = {

    }

    /* TEST --------------------*/
    const patient: Record<string, string> = {
        medical_num:"998451231",
        firstname: "Leo",
        lastname: "Muhl",
        gender: "male",
        adress: "Byggmästaregatan 2",
        phone_num: "0721901327",
        birthdate: "2004-07-31",
        reg_date: "2025-03-24"
    }

    const doctor: Record<string, string | number> = {
        employee_num: 189624,
        full_name: "Lucia Diaz",
    }

    /* -------------------- */

    if(url.pathname === "/api/login" && request.method === "POST"){
        const dataSent = await request.json();
        const idNum = dataSent.id_num;
        let tableName: string;

        if(idNum.length === 6){
            tableName = "Doctor";
            doctor.role = tableName.toLowerCase();
        }
        else if(idNum.length === 9){
            tableName = "Patient";
            patient.role = tableName.toLowerCase();
        }
        else{
            return new Response(JSON.stringify({error: "Medical number invalid"}), {status: 400});
        }

        /* TEST */
        if(patient.medical_num === idNum){
            return new Response(JSON.stringify({dbData: patient}), {status: 200});
        }

        /* const data = await queryToDb(`SELECT * FROM ${tableName} WHERE id = $1`, [idNum]); */
    }

    else if(url.pathname === "/api/register" && request.method === "POST"){
        const dataSent = await request.json();
        
        
    }

    else if(url.pathname === "/api/editProfile" && request.method === "POST"){
        const dataSent = await request.json();

    }

    return new Response("Path Not Found",{status: 404});
}   




async function queryToDb(query: string, userInput: Array<string>): Promise<QueryArrayResult | undefined>{
    const client = await getDbClient();

    try{
        const result = await client.queryArray(query, userInput); 
        return result;  
    }

    catch(error){
        console.error("query error", error);
    }

    finally{
        await closeDbClient();
    }
}

async function insertToDb(query: string, userInput: Array<string>): Promise<void>{
    const client = await getDbClient();

    try{
        const result = await client.queryArray(query, userInput); 
    }

    catch(error){
        console.error("query error", error);
    }

    finally{
        await closeDbClient();
    }
}