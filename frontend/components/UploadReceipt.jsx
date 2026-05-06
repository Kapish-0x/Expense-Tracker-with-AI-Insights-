import React, { useState } from 'react';

function UploadReceipt({ setExpense }) {
    const [file, setFile] = useState(null);

    const uploadReceipt = async () => {
        const formData = new FormData();
        formData.append("receipt", file);

        const res = await fetch('http://localhost:5000/scan-receipt', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        // 🔥 Extract amount from OCR text
        const amountMatch = data.text.match(/₹\s*(\d+)/);

        if (amountMatch) {
            setExpense(parseInt(amountMatch[1]));
        } else {
            alert("Amount not detected");
        }
    };

    return (
        <div>
            <h2>Upload Receipt</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadReceipt}>Scan Receipt</button>
        </div>
    );
}

export default UploadReceipt;