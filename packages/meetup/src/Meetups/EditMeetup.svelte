<script>
  import { createEventDispatcher } from "svelte";
  import { isEmpty,isValidEmail } from "../helpers/validation.js";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = !isValidEmail(email);
  $: formIsValid = titleValid && subtitleValid && addressValid && descriptionValid && imageUrlValid && emailValid;

  function submitForm() {
    dispatch("save", {
      title: title,
      subtitle: subtitle,
      address: address,
      email: email,
      imageUrl: imageUrl,
      description: description
    });
  }

  function cancel() {
    dispatch("cancel");
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
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
  </div>
</Modal>
