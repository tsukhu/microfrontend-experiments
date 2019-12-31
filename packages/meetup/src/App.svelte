<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description: "SMEs who will teach you how to code",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Wikimedia_Hackathon_Prague_2019_-_Group_Photo_-_CLK_-_cropped.jpg/320px-Wikimedia_Hackathon_Prague_2019_-_Group_Photo_-_CLK_-_cropped.jpg",
      address: "27th North Road, 32567 New York",
      contactEmail: "code@test.com"
    },
    {
      id: "m2",
      title: "Treking in India",
      subtitle: "Lets go for a trek",
      description: "Best places to trek in India",
      imageUrl:
        "https://images.thrillophilia.com/image/upload/s--OxgUOv8c--/c_fill,dpr_1.0,f_auto,fl_strip_profile,g_center,h_183,q_auto,w_245/v1/images/photos/000/022/281/original/1516271288_Chadar-Trek.png.jpg",
      address: "50 South Road, 411013 Pune",
      contactEmail: "trek@test.com"
    }
  ];

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: email,
      address: address
    };
    meetups = [newMeetup, ...meetups];
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      type="text"
      label="Title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      type="text"
      label="Subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      type="text"
      label="Address"
      value={address}
      on:input={event => (address = event.target.value)} />

    <TextInput
      id="imageUrl"
      label="Image URL"
      type="text"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />

    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      value={email}
      on:input={event => (email = event.target.value)} />

    <TextInput
      id="description"
      controlType="textarea"
      row="3"
      label="Description"
      type="description"
      value={description}
      on:input={event => (description = event.target.value)} />

    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} />
</main>
