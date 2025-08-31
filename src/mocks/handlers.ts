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

// handler for POST async request : '/api/sign-pdf'
// reads the uploaded PDF file and returns it as a response (stimulated signed pdf file)
// returns headers which is our signed pdf file
