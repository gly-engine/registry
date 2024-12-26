const fs = require("fs");
const path = require("path");

const dir = "dist";
const outputFile = "dist/index.html";

let htmlContent = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>Gamely Registry</title>
  </head>
  <body>
    <h1>Gamely Registry</h1>
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Size (Bytes)</th>
        </tr>
      </thead>
      <tbody>
`;

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const fileSize = stats.size;
      htmlContent += `
        <tr>
          <td><a href="${file}">${file}</a></td>
          <td>${fileSize}</td>
        </tr>
      `;
    }
  });

  htmlContent += `
      </tbody>
    </table>
  </body>
</html>
`;

  fs.writeFile(outputFile, htmlContent, (err) => {
    if (err) {
      console.error("Error writing the HTML file:", err);
    } else {
      console.log(`File ${outputFile} generated successfully!`);    
    }
  });
});
