function doGet(e) {
  const route = decodeURIComponent(e.parameter?.route || 'welcome').trim();

  const fileConfig = {
    'welcome': {
      title: 'Welcome to Apps Script',
      file: 'frontend/welcome/index.html',
    }
  };

  const { title, file } = fileConfig[route];

  const app = HtmlService.createTemplateFromFile(file);

  return app
    .evaluate()
    .setTitle(`${title}`)
    .setFaviconUrl(FAV_ICON)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}
