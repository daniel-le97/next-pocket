import puppeteer from "puppeteer";
import {pb} from './utils/pocketBase'
export default async function handleImageThingy(req, res) {
  try {
    let { url } = req.query;

    let image = await getImageBase64(url);

    res.status(200).json({
      image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: JSON.stringify(error),
    });
  }
}

let getImageBase64 = async (url) => {
  let cachedImage = await getCachedImage(url);
  if (cachedImage) return cachedImage;

  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(url);
  let image = await page.screenshot({ encoding: "base64" });
  await browser.close();

  await cacheImage(url, image);

  return image;
};

let getCachedImage = async (url) => {
  let {image} = await pb.collection('cacheImage').getFirstListItem(`url="${url}"`)
  // let { image } = await prisma.image.findUnique({ where: { url } });
  return image;
};

let cacheImage = async (url, image) => {
  const data = {
    "url":url,
    "image":image
  }
  await pb.collection('cacheImage').create(data)
  // await prisma.image.create({ data: { url, image } });
};
