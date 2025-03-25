export async function apiCom(action, data){
    const options = {};

    switch(action){
        case "login": {
            options.method = "POST";
            options.body = {
                id_num: data.id_num
            }

            const resource = await fetcher("../../api/login", options);
            return resource;
        }

        case "register": {
            options.method = "POST";
            options.body = data

            const resource = await fetcher("../../api/register", options);
            return resource;
        }

        case "editProfile": {
            options.method = "PATCH";
            options.body = data;

            const resource = await fetcher("../../api/editProfile", options);
            return resource;
        }

        case "getDoctor": {
            options.method = "GET";
            const resource = await fetcher(`../../api/doctors?doctor=${data}`, options);
            return resource;
        }

        case "getDoctorAvailability": {
            options.method = "GET";
            const resource = await fetcher(`../../api/availability?doctor=${data}`, options);
            return resource;
        }

        case "getPatientJournals": {
            options.method = "GET";
            const resource = await fetcher(`../../api/journals?patient=${data}`, options);
            return resource;
        }

        case "getPatiententsAndRecordByDoctorId": {
            options.method = "GET";
            const resource = await fetcher(`../../api/patient?doctorId=${data}`, options);
            return resource; 
        }

        case "getBooked": {
            options.method = "GET";
            const resource = await fetcher(`../../api/booked?id=${data}`, options);
            return resource;
        }

        case "getSchedule": {
            options.method = "GET";
            const resource = await fetcher(`../../api/schedule?id=${data}`, options)
            return resource;
        }

        case "getPatientsAndRecord": {
            options.method = "GET";
            const resource = await fetcher(`../../api/patients?patient=${data}`, options);
            return resource; 
        }

        default: {
            console.warn("Unknown action: " + action);
            return null;
        }
    }
}

async function fetcher(url, options){
    try{
        const fetchOptions = {
            method: options.method,
            headers: {"content-type": "application/json"},
        };

        if(fetchOptions.method !== "GET" && options.body){
            fetchOptions.body = JSON.stringify(options.body);
        }

        const response = await fetch(url, fetchOptions);

        if(!response.ok){
            const errorMessage = await response.text();
            throw new Error(`${errorMessage}`);
        };

        return await response.json();
    }
    catch(error){
        console.error(error);
    }
}