
const preprocessor = require('./index.js');

const content = `
<style>
:global(.--child-cls) {
  color: red;
}
</style>

<ChildComponent class="--child-cls" />
`;

console.log(preprocessor().markup({ content }).code);
