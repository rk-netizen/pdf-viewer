import { useState } from "react";
import "./PdfViewer.css";

const PdfViewer = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setPdfUrl(URL.createObjectURL(file));
        } else {
            setPdfUrl(null);
        }
    };

    return (
        <div className="pdf-viewer-container">
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="pdf-upload-input"
            />
            {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    title="PDF Preview"
                    className="pdf-preview"
                />
            )}
        </div>
    );
};

export default PdfViewer;
