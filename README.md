# svelte-preprocess-css-hash
Passing hashed css class name to child component. It is used to avoid class name conflicts.

## Example

input:
```html
<style>
:global(.--child-cls) {
  color: red;
}
</style>

<ChildComponent class="--child-cls" />
```

output:
```html
<style>
:global(.--child-cls-o_ymK9rQg8Q) {
  color: red;
}
</style>

<ChildComponent class="--child-cls-o_ymK9rQg8Q" />
```

Class name with `:global(.--*)` format will be hashed.
It's simply a find-replace operation. So you could pass the class name as other prop name. For example:

```html
<ChildComponent wrapperCls="--wrapper" contentCls="--content" />
```

And in child component, you can receive the class name as a normal prop:

ChildComponent.svelte:
```html
<script>
  let className = '';
  export { className as class };
</script>

<div class={className}>
...
</div>
```

## How to use

Create a `svelte.config.js` file in your project root folder with following contents:

```js
const cssHash = require('svelte-preprocess-css-hash');

module.exports = {
  preprocess: [
    cssHash()
  ]
};
```

## License
[MIT](LICENSE)
