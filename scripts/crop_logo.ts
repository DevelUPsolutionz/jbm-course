import sharp from 'sharp';
import path from 'path';

async function crop() {
  const inputPath = path.join(process.cwd(), 'scratch', 'excel_extracted', 'xl', 'media', 'image1.png');
  const outputPath = path.join(process.cwd(), 'public', 'images', 'excel_template', 'logo_cropped.png');

  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width!;
  const height = metadata.height!;

  // srcRect l="16419" t="7659" r="16716" b="36308"
  const left = Math.round(width * 0.16419);
  const top = Math.round(height * 0.07659);
  const right = Math.round(width * 0.16716);
  const bottom = Math.round(height * 0.36308);

  const cropWidth = width - left - right;
  const cropHeight = height - top - bottom;

  console.log(`Original: ${width}x${height}`);
  console.log(`Cropping: left=${left}, top=${top}, width=${cropWidth}, height=${cropHeight}`);

  await sharp(inputPath)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .toFile(outputPath);

  console.log('Saved cropped logo to:', outputPath);
}

crop().catch(console.error);
