import { useState } from "react";
import "./PdfViewer.css";

// useState hooks for managing Pdf state
// initial state would be null
const PdfViewer = () => {
    // URL for uploaded PDF
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    // contains uploaded PDF file object
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    // contains signed PDF file object after calling API backend respose
    const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);
    // a loading state while backend API call is in progress
    const [loading, setLoading] = useState(false);
    // if somehow API call fails, we set the error or
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // check if uploaded file is a pdf
        // if it is, setPdfUrl value to file
        if (file && file.type === "application/pdf") {
            setPdfUrl(URL.createObjectURL(file));
            setPdfFile(file);
            setSignedPdfUrl(null);
            setError(null);
            // if not then throw error setting all states to null ot initial state
        } else {
            setPdfUrl(null);
            setPdfFile(null);
            setSignedPdfUrl(null);
            setError("Please select a valid PDF file.");
        }
    };

    // this is to check if selected file is in correct format i.e PDF
    // in this snippet Frontend is calling backend APIs
    const handleSignPdf = async () => {
        if (!pdfFile) return;
        setLoading(true);
        setError(null);
        // calling the POST API with uploaded PDF file
        try {
            const formData = new FormData();
            formData.append("file", pdfFile);
            const response = await fetch("/api/sign-pdf", {
                method: "POST",
                body: pdfFile,
                headers: {
                    "Content-Type": "application/pdf",
                },
            });
            // expected return is not 200 status then throw error
            if (!response.ok) throw new Error("Failed to sign PDF");
            const blob = await response.blob();
            setSignedPdfUrl(URL.createObjectURL(blob));
            // this part deals with signing the PDF
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Error signing PDF");
            } else {
                setError("Error signing PDF");
            }
        } finally {
            setLoading(false);
        }
    };

    // File input for uploading PDF.
    // If a PDF is uploaded (but not signed), shows a preview and "Sign PDF" button.
    // If a signed PDF is available, shows its preview and a download link.
    // Displays error messages if any.
    return (
        <div className="pdf-viewer-container">
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="pdf-upload-input"
                aria-label="PDF file"
            />
            {pdfUrl && !signedPdfUrl && (
                <>
                    <iframe
                        src={pdfUrl}
                        title="PDF Preview"
                        className="pdf-preview"
                    />
                    <button
                        className="pdf-sign-btn"
                        onClick={handleSignPdf}
                        disabled={loading}
                    >
                        {loading ? "Signing..." : "Sign PDF"}
                    </button>
                </>
            )}
            {signedPdfUrl && (
                <>
                    <iframe
                        src={signedPdfUrl}
                        title="Signed PDF Preview"
                        className="pdf-preview"
                    />
                    <a
                        href={signedPdfUrl}
                        download="signed.pdf"
                        className="pdf-download-link"
                    >
                        Download Signed PDF
                    </a>
                </>
            )}
            {error && <div className="pdf-error">{error}</div>}
        </div>
    );
};

export default PdfViewer;
