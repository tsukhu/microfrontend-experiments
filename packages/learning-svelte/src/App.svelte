<script>
  import { tick } from "svelte";
  import ContactCard from "./ContactCard.svelte";
  import CustomInput from "./CustomInput.svelte";
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  let name = "Max";
  let title = "";
  let image = "";
  let description = "";
  let formState = "";
  let closable = false;
  let createdContacts = [];
  let agreed;
  let userNameInput;
  let customInput;
  let favColor = "green";
  let singleFavColor = "red";
  let showModal = false;
  let enteredEmail ="";
  let formIsValid = false;
  let text = "This is some dummy text!";
  let price;
  let val = "Tarun";
  let products = [
    {
      id: "p1",
      title: "A Book",
      price: 9.99
    }
  ];

  function deleteFirst() {
    createdContacts = createdContacts.slice(1);
  }

  function deleteLast() {
    createdContacts = createdContacts.slice(0, -1);
  }

  function addContact() {
    if (
      name.trim().length === 0 ||
      title.trim().length === 0 ||
      image.trim().length === 0 ||
      description.trim().length === 0
    ) {
      formState = "invalid";
      return;
    }
    createdContacts = [
      ...createdContacts,
      {
        id: Math.random(),
        name,
        jobTitle: title,
        imageUrl: image,
        desc: description
      }
    ];
    formState = "done";
  }

  function addToCart(event) {
    console.log(event);
  }

  function deleteProduct(event) {
    console.log(event);
  }

  function transform(event) {
    if (event.which !== 9) {
      return;
    }

    event.preventDefault();
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    const value = event.target.value;

    text =
      value.slice(0, selectionStart) +
      value.slice(selectionStart, selectionEnd).toUpperCase() +
      value.slice(selectionEnd);

    tick().then(() => {
      event.target.selectionStart = selectionStart;
      event.target.selectionEnd = selectionEnd;
    });
  }

  $: if (enteredEmail.includes("@")) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  $: console.log(val);
  $: console.log(price);
  $: console.log(agreed);
  $: console.log(favColor);
  $: console.log(singleFavColor);
  $: console.log(customInput);

  function setValue(event) {
    val = event.target.value;
  }

  function saveData() {
    console.log(userNameInput.value);
  }
</script>

<style>
  #form {
    width: 30rem;
    max-width: 100%;
    margin: 1rem 0;
  }
</style>

<hr />
<h1>Validation</h1>
<form on:submit|preventDefault>
  <input type="email" bind:value={enteredEmail} />
  <button type="submit" disabled={!formIsValid}>Save</button>

</form>
<hr />
<h1>Bindings and Forms</h1>
<CustomInput bind:val bind:this={customInput} />
<input type="number" bind:value={price} />
<label for="chbox">
  <input type="checkbox" id="chbox" bind:checked={agreed} />
  Agree to Terms?
</label>

<h1>Favorite Color ?</h1>
<label>
  <input type="radio" name="color" value="red" bind:group={favColor} />
  RED
</label>
<label>
  <input type="radio" name="color" value="green" bind:group={favColor} />
  GREEN
</label>
<label>
  <input type="radio" name="color" value="blue" bind:group={favColor} />
  BLUE
</label>

<select bind:value={singleFavColor}>

  <option value="green">GREEN</option>
  <option value="red">RED</option>
  <option value="blue">BLUE</option>

</select>

<hr />
<input type="text" bind:this={userNameInput} />
<button on:click={saveData}>Save</button>
<!-- <input type="text" bind:value={val}> -->
<!-- <input type="text" value={val}   on:input={setValue}> -->
<hr />
<button on:click={() => (showModal = true)}>Show Modal</button>
{#if showModal}
  <Modal
    on:cancel={() => (showModal = false)}
    on:close={() => (showModal = false)}
    let:didAgree={closable}>
    <h1 slot="header">Hi!</h1>
    <p>This works!</p>
    <button
      slot="footer"
      disabled={!closable}
      on:click={() => (showModal = false)}>
      Confirm
    </button>
  </Modal>
{/if}

<hr />
<textarea rows="5" value={text} on:keydown={transform} />
<hr />
{#each products as product}
  <Product {...product} on:add-to-cart={addToCart} on:delete={deleteProduct} />
{/each}

<hr />
<form id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={name} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
  <button type="submit" on:click|preventDefault={addContact}>
    Add Contact Card
  </button>
</form>

<button
  on:click={event => {
    createdContacts = createdContacts.slice(1);
  }}>
  Delete First
</button>
<button on:click={deleteLast}>Delete Last</button>

{#if formState === 'invalid'}
  <p>Invalid input.</p>
{:else}
  <p>Please enter some data and hit enter</p>
{/if}

{#each createdContacts as contact, i (contact.id)}
  <h2># {i + 1}</h2>
  <ContactCard
    userName={contact.name}
    jobTitle={contact.jobTitle}
    description={contact.desc}
    userImage={contact.imageUrl} />
{:else}
  <p>Please start adding some contacts ..</p>
{/each}
