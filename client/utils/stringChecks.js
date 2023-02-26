 export function containsUrl(text) {
   // Create a regular expression to match URLs
   const urlRegex =
     /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

   // Use the `test` method to check if a URL exists within the text
   return urlRegex.test(text);
 }
 export function containsEmoji(text){
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F910}-\u{1F96B}\u{1F980}-\u{1F9E0}\u{1F9F0}]/u;


    return emojiRegex.test(text)
 }