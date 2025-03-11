import { serveDir } from "jsr:@std/http/file-server";
import { handleApiRequests } from "../api/handleApiRequests.ts";

export function serveFileOrDir(request: Request){
    const pathname = new URL(request.url).pathname;

    if(pathname.startsWith("/api/")){
        return handleRequests(request);
    }

    return serveDir(request, {
        fsRoot: "public",
        urlRoot: ""
    });
}