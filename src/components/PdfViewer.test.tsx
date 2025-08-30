import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PdfViewer from "./PdfViewer";

// Mock URL.createObjectURL
beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => "blob:mock-url");
});

describe("PdfViewer", () => {
    it("renders file input", () => {
        render(<PdfViewer />);
        expect(screen.getByLabelText(/file/i)).toBeInTheDocument();
    });

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
