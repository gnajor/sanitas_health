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

        case "editProfile": {
            options.method = "POST";
            options.body = data;

            const resource = await fetcher("../../api/editProfile", options);
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