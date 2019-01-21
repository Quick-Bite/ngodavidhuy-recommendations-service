let template = (id) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Grubhub Suggestions</title>
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Muli:400,900" rel="stylesheet">
    </head>
    <body>
      <div id="Suggestions">
      </div>
      <script type="text/javascript" src="/bundle.js"></script>
    </body>
  </html>`;
}

module.exports = template;