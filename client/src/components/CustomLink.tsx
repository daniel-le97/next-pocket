import axios from "axios";
import { useEffect, useState } from "react";
import { pb } from "../../utils/pocketBase";
import  handleImageThingy  from "../../preview.js";
export default function CustomLink({ children, href }) {
  let [imagePreview, setImagePreview] = useState("");
  let [isHovering, setIsHovering] = useState(false);
  let inImagePreview = false;
  let inLink = false;

  let handleMouseEnterImage = () => {
    inImagePreview = true;
    setIsHovering(true);
  };

  let handleMouseLeaveImage = () => {
    inImagePreview = false;
    setIsHovering(inLink);
  };

  let handleMouseEnterLink = () => {
    inLink = true;
    setIsHovering(true);
  };

  let handleMouseLeaveLink = () => {
    inLink = false;
    setIsHovering(inImagePreview);
  };

//   let handleFetchImage = async (url) => {
//     //  handleImageThingy(url)
//    let image= await pb.collection("cacheImage").getFirstListItem(`url="${url}"`);
// console.log(image);

   
//     setImagePreview(image.url);
//   };
let handleFetchImage = async (url) => {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL and take a screenshot
    await page.goto(url);
    const screenshot = await page.screenshot({ type: 'png' });

    // Convert the screenshot to a data URL and update the state
    const dataUrl = `data:image/png;base64,${screenshot.toString('base64')}`;
    setImagePreview(dataUrl);

    // Close the browser instance
    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    handleFetchImage(href);

    return () => setImagePreview("");
  }, [href]);

  return (
    <span className="relative z-10 inline-block">
      <a
        href={href}
        className={`${isHovering && "underline"}`}
        onMouseEnter={handleMouseEnterLink}
        onMouseLeave={handleMouseLeaveLink}
        onFocus={handleMouseEnterLink}
        onBlur={handleMouseLeaveLink}
      >
        {children}
      </a>
      {isHovering && (
        <a href={href} target="_blank">
          <span
            className="absolute -top-32 left-1/2 flex h-28 w-36 -translate-x-[4.5rem] translate-y-8 transform items-start justify-center"
            onMouseLeave={handleMouseLeaveImage}
            onMouseEnter={handleMouseEnterImage}
            onFocus={handleMouseEnterImage}
            onBlur={handleMouseLeaveImage}
          >
            {imagePreview ? (
              <img
                className="h-24 w-36 rounded-md bg-white object-cover object-top shadow-lg"
                src={ imagePreview}
                alt={children}
              />
            ) : (
              <span className="flex h-24 w-36 items-center justify-center rounded-md bg-white shadow-lg">
                {/* <Spinner />
                 */}
                ..loading
              </span>
            )}
          </span>
        </a>
      )}
    </span>
  );
}
