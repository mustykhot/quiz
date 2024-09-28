export const decodeHTML = (html: string) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(html, "text/html").body
    .textContent;
  return decodedString || html;
};
