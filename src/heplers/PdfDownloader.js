import { todaydate } from "../service/datevalidator";

export const handlePdfDownload = (data, airwayBillNumber, blob = false) => {
    // Convert the Base64 data to a blob
    try {
        const base64Data = data && data.ReportDoc
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Create a URL for the blob and set it as the href of the anchor tag
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = airwayBillNumber + "-" + todaydate() + "-" + ".pdf";

        // Programmatically trigger a click on the anchor to start the download
        anchor.click();

        // Clean up resources
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error(error)
    }
};

// export const handleExcelDownload = (data, airwayBillNumber) => {
//     // Convert the Base64 data to a blob
//     try {
//         const base64Data = data && data.ReportDoc;

//         const byteCharacters = atob(base64Data);
//         const byteNumbers = new Array(byteCharacters.length);
//         for (let i = 0; i < byteCharacters.length; i++) {
//             byteNumbers[i] = byteCharacters.charCodeAt(i);
//         }
//         const byteArray = new Uint8Array(byteNumbers);
//         const blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

//         // Create a URL for the blob and set it as the href of the anchor tag
//         const blobUrl = URL.createObjectURL(blob);
//         const anchor = document.createElement("a");
//         anchor.href = blobUrl;
//         anchor.download = airwayBillNumber + "-" + todaydate() + "-" + ".xlsx";

//         // Programmatically trigger a click on the anchor to start the download
//         anchor.click();

//         // Clean up resources
//         URL.revokeObjectURL(blobUrl);
//     } catch (error) {
//         console.error(error)
//     }
// };

export const handleExcelDownload = (data, airwayBillNumber) => {
    try {
        // Validate input
        if (!data?.ReportDoc) {
            throw new Error('No data available for download');
        }

        // Remove potential Base64 header if present
        const base64Data = data.ReportDoc.replace(/^data:application\/(.*);base64,/, '');

        // Convert Base64 to Blob
        const byteString = atob(base64Data);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        // Create and trigger download
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${airwayBillNumber}-${todaydate()}.xlsx`;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        }, 100);

    } catch (error) {
        console.error('Excel download failed:', error);
        throw error;
    }
};