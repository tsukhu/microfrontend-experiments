<script>
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { cubicIn } from "svelte/easing";
  import { flip } from "svelte/animate";
  import { fade, fly, slide, scale } from "svelte/transition";
  import Spring from "./Spring.svelte";

  const progress = tweened(0, {
    delay: 0,
    duration: 700,
    easing: cubicIn
  });

  setTimeout(() => {
    progress.set(0.5);
  }, 1500);

  /*   let boxes = [
      'Apples','Bananas','Oranges'
  ]; */
  let boxes = [];
  let showParagraph = false;
  let boxInput;
  function addBox() {
    boxes = [boxInput.value, ...boxes];
  }

  function discard(value) {
    boxes = boxes.filter(el => el !== value);
  }
</script>

<style>
  div {
    width: 10rem;
    height: 10rem;
    background: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    padding: 1rem;
  }
</style>

<!-- <progress value={$progress} /> -->
<!-- <Spring /> -->

<button on:click={() => (showParagraph = !showParagraph)}>Toggle</button>

{#if showParagraph}
  <p
    in:fade
    out:fly={{ x: 300 }}>
    Can you see me?
  </p>
{/if}

<hr />
<input type="text" bind:this={boxInput} />
<button on:click={addBox}>Add</button>
{#if showParagraph}
  {#each boxes as box}
    <div
      transition:fly|local={{ x: 0, y: -300 }}
      on:click={discard.bind(this, box)}
      on:introstart={() => console.log('Adding element starts')}
      on:introend={() => console.log('Adding element ends')}
      on:outrostart={() => console.log('Removing element starts')}
      on:outroend={() => console.log('Removing element ends')}
      animate:flip={{duration: 300}}>
      {box}
    </div>
  {/each}
{/if}
