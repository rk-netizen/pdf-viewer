import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

describe("MSW handlers", () => {
    // this is to setup a mock server to listen
    // these are to setup test file, which run befores the test
    const server = setupServer(...handlers);

    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    // test to validate POST request
    // fetches the POST call : /api/sign-pdf
    // expecting call status to be 200 i.e OK
    // content type should be a pdf
    // API call should return a pdf file only
    // to confirm that return data should be PDF bytes i.e pdf Data below
    it("POST /api/sign-pdf returns a PDF file", async () => {
        // did not provide an actual PDF file
        // rather, we are mocking the PDF data using PDF bytes
        // PDF bytes stimulated actual PDF data or file
        const pdfData = new Uint8Array([1, 2, 3, 4]);
        const response = await fetch("/api/sign-pdf", {
            method: "POST",
            body: Buffer.from(pdfData),
            headers: { "Content-Type": "application/pdf" },
        });
        expect(response.status).toBe(200);
        expect(response.headers.get("Content-Type")).toBe("application/pdf");
        const result = await response.arrayBuffer();
        expect(new Uint8Array(result)).toEqual(pdfData);
    });
});

// these test are integrated with Vitest to run
// use npx vitest run src/mocks/handlers.test.ts command to run these test
// as these test are in Vitest not jest, use this command only to run these test.
