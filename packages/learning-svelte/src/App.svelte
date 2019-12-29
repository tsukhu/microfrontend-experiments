<script>
  import ContactCard from "./ContactCard.svelte";
  let name = "Kumar";
  let jobTitle = "Developer";
  let shortDescription = "lorem ipsum";
  let userImage = "";
  let age = 30;

  // let uppercaseName; not required!

  $: uppercaseName = name.toUpperCase();

  $: console.log(name);

  $: if (name === "Tarun") {
    console.log("It runs!");
    age = 31;
  }

  function incrementAge() {
    age += 1;
  }

  function changeName() {
    name = "Tarun";
  }

  function nameInput(event) {
    const enteredValue = event.target.value;
    name = enteredValue;
  }

  function jobTitleInput(event) {
    const enteredValue = event.target.value;
    jobTitle = enteredValue;
  }

  function shortDescriptionInput(event) {
    const enteredValue = event.target.value;
    shortDescription = enteredValue;
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {uppercaseName}, my age is {age}!</h1>
<button on:click={incrementAge}>Change Age</button>
<!-- <button on:click="{changeName}">Change Name</button> -->
<input type="text" value={name} on:input={nameInput} />
<input type="text" bind:value={userImage} />
<input type="text" value={jobTitle} on:input={jobTitleInput} />
<textarea
  name="test"
  id="test"
  cols="50"
  rows="4"
  bind:value={shortDescription} />

<ContactCard userName={name} {jobTitle} {shortDescription} {userImage} />
