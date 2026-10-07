import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extract() {
  const data = new Uint8Array(fs.readFileSync('d:\\PROJECTS\\JBM-course\\public\\invoice_template.pdf'));
  const loadingTask = pdfjs.getDocument({ data });
  const pdfDoc = await loadingTask.promise;
  const page = await pdfDoc.getPage(1);
  const textContent = await page.getTextContent();

  console.log(`--- Page 1 Text Items (${textContent.items.length}) ---`);
  textContent.items.forEach((item) => {
    if (!item.str || !item.str.trim()) return;
    const x = Math.round(item.transform[4]);
    const y = Math.round(item.transform[5]);
    console.log(`X: ${x}, Y: ${y} => "${item.str}"`);
  });
}

extract().catch(console.error);
