<script>
  import { onMount } from "svelte";
  import hobbyStore from "./hobby-store.js";

  export let name;
  let hobbies = [];
  let hobbyInput = "";
  let isLoading = false;

  isLoading = true;
  let getHobbies = fetch(
    "https://svelte-course-3d38e.firebaseio.com/hobbies.json"
  )
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed!");
      }
      return res.json();
      // ...
    })
    .then(data => {
      // hobbies = Object.values(data);
      hobbyStore.setHobbies(Object.values(data));
      let keys = Object.keys(data);
      console.log(keys);

      for (let keys in data) {
        console.log(keys, data[keys]);
      }
      isLoading = false;
      return hobbies;
    })
    .catch(err => {
      isLoading = false;
      console.log(err);
    });

  function addHobby() {
    //hobbies = [...hobbies, hobbyInput.value];
    hobbyStore.addHobby(hobbyInput.value);
    isLoading = true;
    fetch("https://svelte-course-3d38e.firebaseio.com/hobbies.json", {
      method: "POST",
      body: JSON.stringify(hobbyInput.value),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        isLoading = false;
        if (!res.ok) {
          throw new Error("Failed!");
        }
        // ...
        alert("Saved Data!");
        
      })
      .catch(error => {
        isLoading = false;
        console.log(error);
      });
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<label for="hobby">Hobby</label>
<input type="text" id="hobby" bind:this={hobbyInput} />
<button on:click={addHobby}>Add Hobby</button>

{#if isLoading}
  <p>Loading ...</p>
{:else}
  <ul>
    {#each $hobbyStore as hobby}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}

<!-- {#await getHobbies}
  <p>Loading...</p>
{:then hobbyData}
  <ul>
    {#each hobbyData as hobby}
      <li>{hobby}</li>
    {/each}
  </ul>
{:catch error}
  <p>{error.message}</p>
{/await}
 -->
