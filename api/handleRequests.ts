import { QueryObjectResult } from "jsr:@bartlomieju/postgres";
import { getDbClient, closeDbClient } from "../db/db_com.ts";

export async function handleRequests(request: Request): Promise<Response>{
    const url = new URL(request.url);
    console.log(url.pathname);

    if(url.pathname === "/api/login" && request.method === "POST"){
        const dataSent = await request.json();
        let idNum = dataSent.id_num;
        let tableName: string;
        let roleIdStr: string;

        if(idNum.length === 6){
            tableName = "doctor";
            roleIdStr = "employee_num";
        }
        else if(idNum.length === 9){
            tableName = "patient";
            roleIdStr = "medical_num";
            idNum = idNum.trim();
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

        const data = await queryToDb(`
            INSERT INTO patient (medical_num, firstname, lastname, gender, address, phone_num, birthdate, reg_date)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) `, 
                [
                    dataSent.medical_num,
                    dataSent.firstname,
                    dataSent.lastname,
                    dataSent.gender,
                    dataSent.address,
                    dataSent.phone_num,
                    dataSent.birthdate,
                    dataSent.reg_date
                ]);

        return new Response(JSON.stringify({dbData: dataSent}),{status: 200});
    }

    else if(url.pathname === "/api/editProfile" && request.method === "PATCH"){
        const dataSent = await request.json();

        for (const key in dataSent) {
            const value = dataSent[key];
            const query = `
                UPDATE patient
                SET ${key} = $1
                WHERE medical_num = $2
            `;
            const data = await queryToDb(query, [value, dataSent.medical_num]);
            return new Response(JSON.stringify(data?.rows), {status: 200});
        }
    }

    else if(url.pathname.startsWith("/api/doctors")){
        const urlDoctor = url.searchParams.get("doctor");

        if(urlDoctor === "all"){
            const data = await queryToDb(`
                SELECT 
                    D.employee_num,
                    D.full_name,
                    D.phone_num,
                    S.name,
                    S.visit_cost
                FROM Doctor AS D
                JOIN specialisation AS S ON S.id = D.specialisation_id`, null);
            return new Response(JSON.stringify(data?.rows), {status: 200});
        }
        else{
            if(urlDoctor){
                const data = await queryToDb(`
                    SELECT 
                        D.employee_num,
                        D.full_name,
                        D.phone_num,
                        S.name,
                        S.visit_cost
                    FROM Doctor AS D
                    JOIN specialisation AS S ON S.id = D.specialisation_id
                    WHERE S.name = $1`, [urlDoctor]);
                return new Response(JSON.stringify(data?.rows), {status: 200});
            }
        }
    }

    else if(url.pathname.startsWith("/api/availability")){
        const urlDoctor = url.searchParams.get("doctor");

        if(urlDoctor){
            const data = await queryToDb(`
                SELECT 
                    date,
                    start_time,
                    end_time,
                    doctor.employee_num,
                    doctor.full_name
                FROM availability
                JOIN doctor ON doctor.employee_num=availability.doctor_num
                WHERE doctor_num=$1`, [urlDoctor]);
            return new Response(JSON.stringify(data?.rows), {status: 200});
        }
    }

    else if(url.pathname.startsWith("/api/journals")){
        const urlPatient = url.searchParams.get("patient");

        if(urlPatient){
            const data = await queryToDb(`
                SELECT 
                    doctor_name,
                    diagnosis,
                    prescription,
                    start_time,
                    end_time
                FROM pat_med_rec 
                WHERE medical_num = $1`, [urlPatient]);
            return new Response(JSON.stringify(data?.rows), {status: 200});
        }
    }

	else if(url.pathname.startsWith("/api/booked")){
        const urlId = url.searchParams.get("id");
        let data: QueryObjectResult<Record<string, unknown>> | void;

        if(urlId === "all"){
            data = await queryToDb(`
                SELECT 
                    A.booked_on,
                    A.start_time,
                    A.end_time,
                    D.full_name,
                    P.firstname,
                    P.lastname
                FROM Appointment AS A 
                JOIN Doctor AS D ON D.employee_num = A.doctor_num
                JOIN Patient AS P ON P.medical_num = A.patient_num
                WHERE CURRENT_DATE < A.start_time::DATE`, null);
            return new Response(JSON.stringify(data?.rows), {status: 200});
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
            data = await queryToDb(`
                SELECT 
                    A.booked_on,
                    A.start_time,
                    A.end_time,
                    D.full_name
                FROM Appointment AS A 
                JOIN Doctor AS D ON D.employee_num = A.doctor_num
                WHERE A.patient_num = $1 AND CURRENT_DATE < A.start_time::DATE `, [urlId]);
            return new Response(JSON.stringify(data?.rows), {status: 200});
        }
	}

	else if(url.pathname.startsWith("/api/patient")){
		const doctorId = url.searchParams.get("doctorId");

        if(doctorId){
            const data = await queryToDb(`
                SELECT 
                    firstname,
                    lastname,
                    start_time,
                    end_time,
                    diagnosis,
                    description,
                    prescription,
                    doctor_name
                FROM pat_med_rec
                WHERE doctor_id = $1`, [doctorId]);
            return new Response(JSON.stringify(data?.rows), {status: 200});
        }
	}

    else if(url.pathname.startsWith("/api/schedule")){
        const urlId = url.searchParams.get("id");

        if(urlId){
            const data = await queryToDb(`
                SELECT 
                    id,
                    date,
                    start_time,
                    end_time
                FROM availability
                WHERE doctor_num = $1 AND start_time >= '09:00:00'::TIME AND start_time <= '10:30:00'::TIME `, [urlId]);
            return new Response(JSON.stringify(data?.rows), {status: 200});
        }
    }

    else if(url.pathname === "/api/appointmentBooking" && request.method === "POST"){
        const dataSent = await request.json();

        const data = await queryToDb(`CALL appt_booking($1, $2, $3, $4, $5)`, 
            [
                dataSent.patient_num,
                dataSent.doctor_num,
                dataSent.booked_on,
                dataSent.start_time,
                dataSent.end_time
            ]
        );
        return new Response(JSON.stringify(data?.rows), {status: 200});
        
    }

    else if(url.pathname.startsWith("/api/records") && request.method === "GET"){
        const urlId = url.searchParams.get("patient");

        console.log(urlId);

        if(urlId === "all"){
           /*  const data = await queryToDb(`
                SELECT
                    P.medical_num,
                    P.firstname,
                    P.lastname,
                    

                SELECT ;`, null);
            return new Response(JSON.stringify(data?.rows), {status: 200}); */
        }
    }

    else if(url.pathname === "/api/doctor/create" && request.method === "POST"){
        const dataSent = await request.json();

        const specialisation = await queryToDb(`SELECT id FROM specialisation WHERE name = $1`, [dataSent.specialisation]);
        const specialisation_id = specialisation?.rows[0].id

        const data = await queryToDb(`
            INSERT INTO doctor (employee_num, full_name, specialisation_id, phone_num) 
                VALUES ($1, $2, $3, $4)`, [dataSent.employee_num, dataSent.full_name, specialisation_id, dataSent.phone_num]);
        return new Response(JSON.stringify({}), {status: 200});
    }

    else if(url.pathname === "/api/doctor/delete" && request.method === "DELETE"){
        const dataSent = await request.json();
        const data = await queryToDb(`DELETE FROM doctor WHERE employee_num = $1`, [dataSent]);
        return new Response(JSON.stringify(data?.rows), {status: 200});
    }

    else if(url.pathname === "/api/doctor/schedule"){
        const dataSent = await request.json();

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

