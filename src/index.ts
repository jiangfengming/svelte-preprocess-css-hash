import crypto from 'node:crypto'

export default function () {
  return {
    markup({ content }: { content: string }): { code: string } {
      const styleMatch = content.match(/<style[\s\S]*<\/style>/)

      if (!styleMatch) {
        return { code: content }
      }

      const style = styleMatch[0]
      const clsSet = new Set<string>()
      const regex = /:global\([^)]*?\.(-[\w-]+)/g
      let match: RegExpExecArray | null

      // eslint-disable-next-line no-cond-assign
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
        content = content.replace(new RegExp(cls, 'g'), `${cls}-${hash}`)
      }

      return { code: content }
    },
  }
}
