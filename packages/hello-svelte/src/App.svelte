<script>
  export let name;

  function sendMessage() {
    this.dispatchEvent(
      new CustomEvent("svelteEvent", {
        composed: true
      })
    );
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<svelte:options tag="hello-svelte" />

<button on:click={sendMessage} >Send Message!</button>
<h1>Hello {name}!</h1>
