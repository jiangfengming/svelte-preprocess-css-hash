const crypto = require('crypto')

module.exports = () => ({
  markup({ content }) {
    let style = content.match(/<style[\s\S]*<\/style>/)

    if (!style) {
      return { code: content }
    }

    style = style[0]
    const clsSet = new Set()
    let match
    const regex = /:global\([^)]*?\.(--[\w-]+)/g

    while ((match = regex.exec(style)) !== null) {
      clsSet.add(match[1])
    }

    if (!clsSet.size) {
      return { code: content }
    }

    const hash = crypto
      .createHash('sha1')
      .update(style)
      .digest('base64')
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
      .replace(/=/g, '')

    for (const cls of clsSet) {
      content = content.replace(new RegExp(cls, 'g'), cls + '-' + hash)
    }

    return { code: content }
  }
})
