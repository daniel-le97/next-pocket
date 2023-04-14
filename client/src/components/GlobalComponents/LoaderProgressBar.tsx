import ProgressBar from "@badrap/bar-of-progress";

export const progress = new ProgressBar({
  size: 2,
  color: "#38a169",
  className: "bar-of-progress",
  delay: 100,
});
 //color: "#38a169",

 export const LoaderProgress = () => {
   return (
     <div className="fixed inset-0 h-1">
       <div className="relative h-0.5 w-full overflow-hidden rounded-lg shadow  ">
         <div className="animate-loader   absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-500 shadow-md shadow-indigo-500  "></div>
       </div>
     </div>
   );
 };