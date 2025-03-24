import { serveDir } from "jsr:@std/http/file-server";
import { handleRequests } from "../api/handleRequests.ts"

export function routeRequest(request: Request){
    const pathname = new URL(request.url).pathname;

    if(pathname.startsWith("/api/")){
        return handleRequests(request);
    }

    return serveDir(request, {
        fsRoot: "public",
        urlRoot: ""
    });
}

Deno.serve(routeRequest);