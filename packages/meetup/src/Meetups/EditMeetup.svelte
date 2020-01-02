<script>
  import meetups from "./meetups-store.js";
  import { createEventDispatcher } from "svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation.js";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  export let id = null;

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      email = selectedMeetup.contactEmail;
      imageUrl = selectedMeetup.imageUrl;
      description = selectedMeetup.description;
    });
    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = !isValidEmail(email);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    descriptionValid &&
    imageUrlValid &&
    emailValid;

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: email,
      address: address
    };
    if (id) {
      fetch(`https://svelte-course-3d38e.firebaseio.com/meetups/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occured, please try again");
          }
          meetups.updateMeetup(id, meetupData);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      fetch("https://svelte-course-3d38e.firebaseio.com/meetups.json", {
        method: "POST",
        body: JSON.stringify({ ...meetupData, isFavorite: false }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occured, please try again");
          }
          return res.json();
        })
        .then(data => {
          meetups.addMeetup({
            ...meetupData,
            isFavorite: false,
            id: data.name
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }

  function deleteMeetup() {
    fetch(`https://svelte-course-3d38e.firebaseio.com/meetups/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("An error occured, please try again");
        }
        meetups.removeMeetup(id);
      })
      .catch(err => {
        console.log(err);
      });

    dispatch("save");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      valid={titleValid}
      validityMessage="Please enter a valid title."
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      value={address}
      valid={addressValid}
      validityMessage="Please enter a valid address."
      on:input={event => (address = event.target.value)} />

    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      valid={imageUrlValid}
      validityMessage="Please enter a valid imageURL."
      on:input={event => (imageUrl = event.target.value)} />

    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      value={email}
      valid={emailValid}
      validityMessage="Please enter a valid email."
      on:input={event => (email = event.target.value)} />

    <TextInput
      id="description"
      controlType="textarea"
      rows="3"
      label="Description"
      type="description"
      value={description}
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      bind:value={description} />

  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>
      Save
    </Button>
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>
