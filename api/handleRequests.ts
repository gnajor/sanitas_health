import { QueryArrayResult } from "jsr:@bartlomieju/postgres";
import { getDbClient, closeDbClient } from "../db/db_com.ts";


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
    employee_num: "189624",
    full_name: "Lucia Diaz",
    phone_num: "0721901328"
}



const doctors = [
    {
      full_name: "Dr. Emily Carter",
      phone_num: "+1-555-1234",
      specialisation: "Cardiologist",
      cost: "$250",
      appointments: [
        {
          date: "2025-03-26",
          start_time: "09:00 AM",
          end_time: "10:00 AM"
        },
        {
          date: "2025-03-27",
          start_time: "11:00 AM",
          end_time: "12:00 PM"
        }
      ]
    },
    {
      full_name: "Dr. James Wilson",
      phone_num: "+1-555-5678",
      specialisation: "Dentist",
      cost: "$150",
      appointments: [
        {
          date: "2025-03-26",
          start_time: "10:30 AM",
          end_time: "11:30 AM"
        },
        {
          date: "2025-03-28",
          start_time: "02:00 PM",
          end_time: "03:00 PM"
        }
      ]
    },
    {
      full_name: "Dr. Sarah Thompson",
      phone_num: "+1-555-8765",
      specialisation: "Psychiatrist",
      cost: "$200",
      appointments: [
        {
          date: "2025-03-26",
          start_time: "01:00 PM",
          end_time: "02:00 PM"
        },
        {
          date: "2025-03-29",
          start_time: "03:30 PM",
          end_time: "04:30 PM"
        }
      ]
    },
    {
      full_name: "Dr. Robert Hayes",
      phone_num: "+1-555-4321",
      specialisation: "Cardiologist",
      cost: "$300",
      appointments: [
        {
          date: "2025-03-27",
          start_time: "09:30 AM",
          end_time: "10:30 AM"
        },
        {
          date: "2025-03-28",
          start_time: "01:30 PM",
          end_time: "02:30 PM"
        }
      ]
    },
    {
      full_name: "Dr. Olivia Martinez",
      phone_num: "+1-555-6789",
      specialisation: "Dentist",
      cost: "$180",
      appointments: [
        {
          date: "2025-03-26",
          start_time: "08:00 AM",
          end_time: "09:00 AM"
        },
        {
          date: "2025-03-29",
          start_time: "04:00 PM",
          end_time: "05:00 PM"
        }
      ]
    },
    {
      full_name: "Dr. Ethan Walker",
      phone_num: "+1-555-2468",
      specialisation: "Psychiatrist",
      cost: "$220",
      appointments: [
        {
          date: "2025-03-27",
          start_time: "10:00 AM",
          end_time: "11:00 AM"
        },
        {
          date: "2025-03-29",
          start_time: "12:00 PM",
          end_time: "01:00 PM"
        }
      ]
    },
    {
      full_name: "Dr. Sophia Bennett",
      phone_num: "+1-555-1357",
      specialisation: "Cardiologist",
      cost: "$275",
      appointments: [
        {
          date: "2025-03-26",
          start_time: "10:00 AM",
          end_time: "11:00 AM"
        },
        {
          date: "2025-03-28",
          start_time: "02:30 PM",
          end_time: "03:30 PM"
        }
      ]
    },
    {
      full_name: "Dr. Daniel Foster",
      phone_num: "+1-555-9753",
      specialisation: "Dentist",
      cost: "$160",
      appointments: [
        {
          date: "2025-03-27",
          start_time: "03:00 PM",
          end_time: "04:00 PM"
        },
        {
          date: "2025-03-29",
          start_time: "09:00 AM",
          end_time: "10:00 AM"
        }
      ]
    },
    {
      full_name: "Dr. Mia Reynolds",
      phone_num: "+1-555-8642",
      specialisation: "Psychiatrist",
      cost: "$210",
      appointments: [
        {
          date: "2025-03-27",
          start_time: "11:00 AM",
          end_time: "12:00 PM"
        },
        {
          date: "2025-03-28",
          start_time: "03:00 PM",
          end_time: "04:00 PM"
        }
      ]
    },
    {
      full_name: "Dr. Henry Cooper",
      phone_num: "+1-555-1122",
      specialisation: "Cardiologist",
      cost: "$350",
      appointments: [
        {
          date: "2025-03-26",
          start_time: "02:00 PM",
          end_time: "03:00 PM"
        },
        {
          date: "2025-03-29",
          start_time: "10:00 AM",
          end_time: "11:00 AM"
        }
      ]
    }
  ];


  const records = [
    {
      full_name: "Dr. Emily Carter",
      diagnosis: "Hypertension",
      prescription: "Atenolol 50mg daily"
    },
    {
      full_name: "Dr. James Wilson",
      diagnosis: "Tooth Decay",
      prescription: "Amoxicillin 500mg three times a day for 7 days"
    },
    {
      full_name: "Dr. Sarah Thompson",
      diagnosis: "Anxiety Disorder",
      prescription: "Sertraline 25mg daily"
    },
    {
      full_name: "Dr. Robert Hayes",
      diagnosis: "Heart Disease",
      prescription: "Lisinopril 10mg daily"
    },
    {
      full_name: "Dr. Olivia Martinez",
      diagnosis: "Gum Inflammation",
      prescription: "Chlorhexidine mouthwash"
    },
    {
      full_name: "Dr. Ethan Walker",
      diagnosis: "Depression",
      prescription: "Escitalopram 10mg daily"
    },
    {
      full_name: "Dr. Sophia Bennett",
      diagnosis: "Arrhythmia",
      prescription: "Atenolol 25mg daily"
    },
    {
      full_name: "Dr. Daniel Foster",
      diagnosis: "Cavities",
      prescription: "Fluoride toothpaste"
    },
    {
      full_name: "Dr. Mia Reynolds",
      diagnosis: "Post-Traumatic Stress Disorder",
      prescription: "Paroxetine 20mg daily"
    },
    {
      full_name: "Dr. Henry Cooper",
      diagnosis: "Coronary Artery Disease",
      prescription: "Aspirin 81mg daily"
    }
  ];

/* -------------------- */

export async function handleRequests(request: Request): Promise<Response>{
    const url = new URL(request.url);

    if(url.pathname === "/api/login" && request.method === "POST"){
        const dataSent = await request.json();
        const idNum = dataSent.id_num;
        let tableName: string;

        if(idNum.length === 6){
            tableName = "doctor";
            doctor.role = tableName.toLowerCase();

        }
        else if(idNum.length === 9){
            tableName = "patient";
            patient.role = tableName.toLowerCase();
        }
        else{
            return new Response(JSON.stringify({error: "Medical number invalid"}), {status: 400});
        }

        /* TEST */
        if(patient.medical_num === idNum){
            return new Response(JSON.stringify({dbData: patient}), {status: 200});
        }

/*         if(doctor.employee_num === idNum){
            return new Response(JSON.stringify({dbData: doctor}), {status: 200});
        } */

        /* const data = await queryToDb(`SELECT * FROM ${tableName} WHERE id = $1`, [idNum]); */
    }

    else if(url.pathname === "/api/register" && request.method === "POST"){
        const dataSent = await request.json();
        
        
    }

    else if(url.pathname === "/api/editProfile" && request.method === "PATCH"){
        const dataSent = await request.json();
        return new Response(JSON.stringify(dataSent),{status: 200});
    }

    else if(url.pathname.startsWith("/api/doctors")){
        const urlDoctor = url.searchParams.get("doctor");

        if(urlDoctor === "all"){
            return new Response(JSON.stringify({dbData: doctors}), {status: 200});
        }
        else{
            return new Response(JSON.stringify(doctors.filter(doctor => doctor.specialisation === urlDoctor)), {status: 200});
        }
    }

    else if(url.pathname.startsWith("/api/appointment")){
        const urlDoctor = url.searchParams.get("doctor");

        return new Response(JSON.stringify({dbData: doctors.find(doctor => doctor.full_name === urlDoctor)?.appointments}));
    }

    else if(url.pathname.startsWith("/api/journals")){
        const urlPatient = url.searchParams.get("patient");

        return new Response(JSON.stringify({dbData: records}));
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