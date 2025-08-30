import { http, HttpResponse, HttpHandler } from "msw";

export const handlers: HttpHandler[] = [
    http.post("/api/sign-pdf", async ({ request }) => {
        const fileBuffer = await request.arrayBuffer();
        return new HttpResponse(fileBuffer, {
            status: 200,
            headers: { "Content-Type": "application/pdf" },
        });
    }),
];
