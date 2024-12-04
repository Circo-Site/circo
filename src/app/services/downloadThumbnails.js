const fs = require('fs-extra');
const path = require('path');
const Vimeo = require('vimeo').Vimeo;
const axios = require('axios');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env


const clientToken = process.env.VIMEO_CLIENT_TOKEN;
const clientId = process.env.VIMEO_CLIENT_ID;
const clientSecret = process.env.VIMEO_CLIENT_SECRET;

let client = new Vimeo(clientId, clientSecret, clientToken);

async function getVideoImages(videoId) {
  return new Promise((resolve, reject) => {
    client.request({
      method: 'GET',
      path: `/videos/${videoId}/pictures`
    }, (error, body, statusCode, headers) => {
      if (error) {
        console.error(`Error fetching images for video ${videoId}:`, error);
        return reject(error);
      }
      resolve(body.data[0].base_link);
    });
  });
}

async function downloadImage(url, filepath) {
  const writer = fs.createWriteStream(filepath);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function downloadImagesForVideo(videoId, nomeVideo) {
  const imageUrl = await getVideoImages(videoId);
  const filepath = path.join(__dirname, '../../assets/videos/Thumbnails', nomeVideo + '.png');

  // Ensure the assets directory exists
  await fs.ensureDir(path.join(__dirname, '../../assets/videos/Thumbnails'));

  console.log(`Downloading image from ${imageUrl} to ${filepath}`);
  await downloadImage(imageUrl, filepath);
  console.log(`Downloaded ${nomeVideo}`);
}

async function main() {
  const videos = [
    
    {
        id: 83662973,
        nome: 'LOS ROSALES'
    },
    {
      id: 265029985,
      nome: 'Itaipava Premium'
  },
  ];

  for (const video of videos) {
    try {
      await downloadImagesForVideo(video.id, video.nome);
    } catch (error) {
      console.error(`Failed to download images for video ${videoId}:`, error);
    }
  }
}

main().catch(console.error);