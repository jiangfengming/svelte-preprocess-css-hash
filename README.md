# svelte-preprocess-css-hash
Passing hashed css class name to child component. It is used to avoid class name conflicts.

## Example

input:
```html
<style>
  :global(.-child-cls) {
    color: red;
  }

  :global(.-child-cls:hover .-nested-cls) {
    color: green;
  }

  :global(html.night .-child-cls .-nested-cls) {
    color: blue;
  }
</style>

<ChildComponent class="-child-cls" />
```

output:
```html
<style>
  :global(.-child-cls-pXX_fA) {
    color: red;
  }

  /* only the first class name that is prefixed with '-' will be hashed */
  :global(.-child-cls-pXX_fA:hover .-nested-cls) {
    color: green;
  }

  :global(html.night .-child-cls-pXX_fA .-nested-cls) {
    color: blue;
  }
</style>

<ChildComponent class="-child-cls-pXX_fA" />
```

The first class name that is prefixed with `-`  within `:global() ` will be hashed.
It's simply a find-replace operation. So you could pass the class names to other attributes. For example:

```html
<ChildComponent wrapperCls="-wrapper" contentCls="-content" />
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
const cssHash = require('svelte-preprocess-css-hash')

module.exports = {
  preprocess: [
    cssHash()
  ]
}
```

## License
[MIT](LICENSE)
