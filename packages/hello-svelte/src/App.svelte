<script>
  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<svelte:options tag="hello-svelte" />
<h1>Hello {name}!</h1>
