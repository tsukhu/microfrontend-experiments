<script>
  import { tick } from "svelte";
  import ContactCard from "./ContactCard.svelte";
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  let name = "Max";
  let title = "";
  let image = "";
  let description = "";
  let formState = "";
  let closable = false;
  let createdContacts = [];

  let showModal = false;
  let text = "This is some dummy text!";

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
    })

  }
</script>

<style>
  #form {
    width: 30rem;
    max-width: 100%;
    margin: 1rem 0;
  }
</style>

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

<textarea rows="5" value={text} on:keydown={transform} />
{#each products as product}
  <Product {...product} on:add-to-cart={addToCart} on:delete={deleteProduct} />
{/each}

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
