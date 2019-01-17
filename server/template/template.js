let template = (restaurantId) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Sidebar</title>
    </head>
    <body>
      <div id="suggestions">
      </div>
      <script type="text/javascript" src="/bundle.js"></script>
      <script>
        ReactDOM.render(
          React.createElement(Suggestions, {restaurantId: ${restaurantId}}, null),
          document.getElementById('suggestions')
        );
      </script>
    </body>
  </html>`;
}

module.exports = template;