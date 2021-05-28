
const preprocessor = require('./index.js');

const content = `
<style>
  :global(.--child-cls) {
    color: red;
  }

  :global(.--child-cls:hover .nested-cls) {
    color: green;
  }
</style>

<ChildComponent class="--child-cls" />
`;

console.log(preprocessor().markup({ content }).code);
