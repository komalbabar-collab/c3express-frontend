import { PDFDocument, rgb } from 'pdf-lib';

async function base64ToPdf(base64String) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  // Decode the Base64 string to bytes
  const pdfBytes = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
  // Embed the decoded bytes into the PDF document
  const externalPdfDoc = await PDFDocument.load(pdfBytes);
  const pages = await pdfDoc.copyPages(externalPdfDoc, externalPdfDoc.getPageIndices());
  pages.forEach((page) => pdfDoc.addPage(page));

  // Set the author information (optional)
  pdfDoc.setTitle('Converted PDF');
  pdfDoc.setAuthor('Your Name');
  pdfDoc.setSubject('Convert Base64 to PDF in React');

  // Serialize the PDF to bytes
  const pdfBytesResult = await pdfDoc.save();

  return pdfBytesResult;
}
