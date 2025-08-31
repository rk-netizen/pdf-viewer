import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PdfViewer from "./PdfViewer";

// Mock URL.createObjectURL so that PDF preview works in tests without real blobs
beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => "blob:mock-url");
});

describe("PdfViewer", () => {
    // Test that the file input is rendered
    it("renders file input", () => {
        render(<PdfViewer />);
        expect(screen.getByLabelText(/file/i)).toBeInTheDocument();
    });

    // Test that an error message appears for non-PDF file uploads
    it("shows error for non-PDF file", async () => {
        render(<PdfViewer />);
        const input = screen.getByLabelText(/file/i);
        fireEvent.change(input, {
            target: {
                files: [new File(["test"], "test.txt", { type: "text/plain" })],
            },
        });
        expect(
            await screen.findByText(/please select a valid pdf file/i)
        ).toBeInTheDocument();
    });

    // Test that a valid PDF file shows a preview and the sign button
    it("shows PDF preview and sign button for valid PDF", async () => {
        render(<PdfViewer />);
        const input = screen.getByLabelText(/file/i);
        fireEvent.change(input, {
            target: {
                files: [
                    new File(["dummy"], "test.pdf", {
                        type: "application/pdf",
                    }),
                ],
            },
        });
        expect(await screen.findByTitle(/pdf preview/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /sign pdf/i })
        ).toBeInTheDocument();
    });
});

// this test file uses Jest and React Testing Library
// command to run tests is npx jest src/components/PdfViewer.test.tsx
// to quickly run or debug tests, use the "Debug" and "Run" option in your IDE
