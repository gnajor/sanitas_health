/* import { closeDbClient, getDbClient } from "./db/db_com.ts";


async function test(){
    try{
        const client = await getDbClient();
    }
    finally{
        closeDbClient();
    }
}

test(); */

import { renderHomePage } from "./pages/homePage/homePage.js";

renderHomePage("#wrapper");

