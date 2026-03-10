import { useState, useRef} from "react";
import SignatureCanvas from "react-signature-canvas";

interface DocumentItem {
  id: number;
  name: string;
  fileUrl: string;
  status: "Draft" | "In Review" | "Signed";
}

function DocumentChamberPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

 const sigPad = useRef<SignatureCanvas | null>(null);

  // Upload document
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newDoc: DocumentItem = {
      id: Date.now(),
      name: file.name,
      fileUrl: URL.createObjectURL(file),
      status: "Draft",
    };

    setDocuments([...documents, newDoc]);
  };

  // Change document status
  const changeStatus = (id: number, status: "Draft" | "In Review" | "Signed") => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, status: status } : doc
      )
    );
  };

  // Save signature
 const handleSign = () => {
  if (!sigPad.current) return;

let signature = "";

if (sigPad.current) {
  signature = sigPad.current
    .getTrimmedCanvas()
    .toDataURL("image/png");
}

  if (selectedDoc) {
    changeStatus(selectedDoc.id, "Signed");
  }
};
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Document Chamber</h1>

      {/* Upload */}
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />

      <div className="mt-6 grid grid-cols-2 gap-6">

        {/* Document List */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Uploaded Documents</h2>

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border p-3 rounded mb-2 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{doc.name}</p>
                <span className="text-sm text-gray-500">
                  Status: {doc.status}
                </span>
              </div>

              <div className="space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => setSelectedDoc(doc)}
                >
                  Preview
                </button>

                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => changeStatus(doc.id, "In Review")}
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Preview + Signature */}
        <div>
          {selectedDoc && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Preview: {selectedDoc.name}
              </h2>

              {/* PDF Preview */}
              <iframe
                src={selectedDoc.fileUrl}
                title="Document Preview"
                className="w-full h-64 border mb-4"
              />
{/* Signature Pad */}
<div className="mt-6">
  <h2 className="text-lg font-semibold mb-2">E-Signature</h2>

  <SignatureCanvas
    ref={sigPad}
    penColor="black"
    canvasProps={{
      width: 400,
      height: 200,
      className: "border rounded bg-white",
    }}
  />

  <div className="mt-2 flex gap-2">
    <button
      onClick={() => sigPad.current?.clear()}
      className="px-3 py-1 bg-gray-400 text-white rounded"
    >
      Clear
    </button>

    <button
      onClick={handleSign}
      className="px-3 py-1 bg-green-600 text-white rounded"
    >
      Sign Document
    </button>
  </div>
</div>



              {/* Signature Pad */}
              <h3 className="font-semibold mb-2">E-Signature</h3>

              <SignatureCanvas
                ref={sigPad}
                penColor="black"
                canvasProps={{
                  width: 400,
                  height: 150,
                  className: "border",
                }}
              />

              <div className="mt-2 space-x-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={handleSign}
                >
                  Sign Document
                </button>

                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                  onClick={() => sigPad.current?.clear()}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>

  );
}

export default DocumentChamberPage;