const { metrohash64 } = require('metrohash');

module.exports = () => ({
  markup({ content }) {
    let style = content.match(/<style[\s\S]*<\/style>/);

    if (!style) {
      return { code: content };
    }

    style = style[0];
    const clsArr = [];
    let match;
    const regex = /:global\(\.(--[\w-]+)/g;

    while ((match = regex.exec(style)) !== null) {
      clsArr.push(match[1]);
    }

    if (!clsArr.length) {
      return { code: content };
    }

    const hash = Buffer.from(metrohash64(style), 'hex')
      .toString('base64')
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
      .replace(/=/g, '');

    for (const cls of clsArr) {
      content = content.replace(new RegExp(cls, 'g'), cls + '-' + hash);
    }

    return { code: content };
  }
});
