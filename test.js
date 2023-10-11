const preprocessor = require('./index.js')

let content

content = `
<style>
  :global(.--child-cls) {
    color: red;
  }
</style>

<ChildComponent class="--child-cls" />
`

console.log(preprocessor().markup({ content }).code)

content = `
<style>
  :global(.--child-cls:hover .--nested-cls) {
    color: green;
  }
</style>

<ChildComponent class="--child-cls" />
`

console.log(preprocessor().markup({ content }).code)

content = `
<style>
  :global(html.night .--child-cls:hover .--nested-cls) {
    color: green;
  }
</style>

<ChildComponent class="--child-cls" />
`

console.log(preprocessor().markup({ content }).code)
