import { useState } from "react";
import "./PdfViewer.css";

const PdfViewer = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setPdfUrl(URL.createObjectURL(file));
            setPdfFile(file);
            setSignedPdfUrl(null);
            setError(null);
        } else {
            setPdfUrl(null);
            setPdfFile(null);
            setSignedPdfUrl(null);
            setError("Please select a valid PDF file.");
        }
    };

    const handleSignPdf = async () => {
        if (!pdfFile) return;
        setLoading(true);
        setError(null);
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
            if (!response.ok) throw new Error("Failed to sign PDF");
            const blob = await response.blob();
            setSignedPdfUrl(URL.createObjectURL(blob));
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
