import PdfViewer from "./components/PdfViewer.tsx";

function App() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-600 drop-shadow-lg">
                PDF Viewer
            </h1>
            <PdfViewer />
        </div>
    );
}

export default App;
