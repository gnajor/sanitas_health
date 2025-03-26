import { QueryObjectResult } from "jsr:@bartlomieju/postgres";
import { getDbClient, closeDbClient } from "../db/db_com.ts";

export async function handleRequests(request: Request): Promise<Response>{
    const url = new URL(request.url);
    console.log(url.pathname);


    if(url.pathname === "/api/login" && request.method === "POST"){
        const dataSent = await request.json();
        const idNum = dataSent.id_num;
        let tableName: string;
        let roleIdStr: string;

        if(idNum.length === 6){
            tableName = "doctor";
            roleIdStr = "employee_num";
        }
        else if(idNum.length === 9){
            tableName = "patient";
            roleIdStr = "medical_num";
        }
        else{
            return new Response(JSON.stringify({error: "Medical number invalid"}), {status: 400});
        }

        const data = await queryToDb(`SELECT * FROM ${tableName} WHERE ${roleIdStr} = $1`, [idNum]);
        if(data){
            data.rows[0].specialisation_id = Number(data?.rows[0].specialisation_id);
            data.rows[0].role = tableName;
        }

        return new Response(JSON.stringify(data?.rows[0]), {status: 201});
    }

    else if(url.pathname === "/api/register" && request.method === "POST"){
        const dataSent = await request.json();
        return new Response(JSON.stringify({dbData: dataSent}),{status: 200});
    }

    else if(url.pathname === "/api/editProfile" && request.method === "PATCH"){
        const dataSent = await request.json();
        return new Response(JSON.stringify(dataSent),{status: 200});
    }

    else if(url.pathname.startsWith("/api/doctors")){
        const urlDoctor = url.searchParams.get("doctor");

        if(urlDoctor === "all"){
            return new Response(JSON.stringify({}), {status: 200});
        }
        else{
            return new Response(JSON.stringify({}), {status: 200});
        }
    }

    else if(url.pathname.startsWith("/api/availability")){
        const urlDoctor = url.searchParams.get("doctor");

        return new Response(JSON.stringify({}));
    }

    else if(url.pathname.startsWith("/api/journals")){
        const urlPatient = url.searchParams.get("patient");

        return new Response(JSON.stringify({}));
    }

	else if(url.pathname.startsWith("/api/booked")){
        const urlId = url.searchParams.get("id");
        let data: QueryObjectResult<Record<string, unknown>> | void;

        if(urlId === "all"){
           
            //admin
        }
        else if(urlId?.length === 6){
            data = await queryToDb(`
                SELECT 
                    A.booked_on,
                    A.start_time,
                    A.end_time,
                    P.firstname,
                    P.lastname
                FROM Appointment AS A 
                JOIN Patient AS P ON P.medical_num = A.patient_num
                WHERE A.doctor_num = $1 AND CURRENT_DATE < A.start_time::DATE `, [urlId]);
            return new Response(JSON.stringify(data?.rows), {status: 200});
        }
        else if(urlId?.length === 9){
       /*      data = await queryToDb(`
                SELECT 
                    *
                FROM Appointment`);

                console.log(data) */
        }
	}

	else if(url.pathname.startsWith("/api/patient")){
		const doctorId = url.searchParams.get("doctorId");

        //query

		return new Response(JSON.stringify({}));
	}

    else if(url.pathname.startsWith("/api/schedule")){
        const urlId = url.searchParams.get("id");

        //query

        return new Response(JSON.stringify({}));
    }

    else if(url.pathname.startsWith("/api/patients")){
        const urlId = url.searchParams.get("patient");
        
        if(urlId === "all"){
            //query
        }
        return new Response(JSON.stringify({}));
    }

    else if(url.pathname === "/api/doctor/create" && request.method === "POST"){
        const dataSent = await request.json();
        //query

        return new Response(JSON.stringify({}),{status: 200});
    }

    else if(url.pathname === "/api/doctor/delete" && request.method === "DELETE"){
        const dataSent = await request.json();
        //query

        return new Response(JSON.stringify(dataSent),{status: 200});
    }

    else if(url.pathname === "/api/doctor/schedule"){
        const dataSent = await request.json();

        //query

        return new Response(JSON.stringify(dataSent),{status: 200});
    }

    return new Response("Path Not Found",{status: 404});
}   




async function queryToDb(query: string, userInput: Array<string> | null): Promise<QueryObjectResult<Record<string, unknown>> | void>{
    const client = await getDbClient();

    try{
        let result: QueryObjectResult<Record<string, unknown>>;

        if (userInput) {
            result = await client.queryObject<Record<string, unknown>>(query, userInput);
        } 
        else {
            result = await client.queryObject<Record<string, unknown>>(query);
        }
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

