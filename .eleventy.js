const moment = require('moment');

module.exports = config => {
  config.setDataDeepMerge(true);

  let markdownIt = require("markdown-it");
  let markdownItAnchor = require('markdown-it-anchor');
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  config.addFilter('permalink', str => {
    str = str || '';
    return str.replace(/\.html/g, '');
  });

  config.addFilter("date", function(value) {
    return moment(value).format('D MMM YYYY');
  });

  config.addFilter("monthyear", function(value) {
    return moment(value).format('MMMM YYYY');
  });

  config.addFilter("year", function(value) {
    return moment(value).format('YYYY');
  });

  config.addFilter('strip_html', str => {
    return str.replace(
      /<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,
      ''
    )
  });

  config.addCollection('article', function(collection) {
    return collection.getFilteredByTag('article').filter(function(item) {
      return item.data.permalink;
    });
  });


  config.addCollection('case-study', function(collection) {
    return collection.getFilteredByTag('case-study').filter(function(item) {
      return item.data.permalink;
    });
  });

  config
  .addPassthroughCopy('src/site/assets/fonts')
  .addPassthroughCopy('src/site/assets/images')

  config.setTemplateFormats(['njk', 'md', 'html', 'png', 'ico', 'svg', 'xml']);

  return {
    dir: {
      input: 'src/site',
      includes: '_includes',
      data: '_data',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
