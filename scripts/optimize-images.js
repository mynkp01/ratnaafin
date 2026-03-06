const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../src/assets/other');
const outputDir = path.join(__dirname, '../src/assets/other');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
    const files = fs.readdirSync(publicDir);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|webp)$/i)) {
            const inputPath = path.join(publicDir, file);
            const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG|webp)$/i, '_min.webp'));

            try {
                await sharp(inputPath)
                    .webp({ quality: 75 })
                    .toFile(outputPath);

                console.log(`Optimized: ${file} -> ${path.basename(outputPath)}`);
            } catch (error) {
                console.error(`Error optimizing ${file}:`, error);
            }
        }
    }
}

optimizeImages();