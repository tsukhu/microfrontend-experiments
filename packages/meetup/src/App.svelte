<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let editMode = null;

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description: "SMEs who will teach you how to code",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Wikimedia_Hackathon_Prague_2019_-_Group_Photo_-_CLK_-_cropped.jpg/320px-Wikimedia_Hackathon_Prague_2019_-_Group_Photo_-_CLK_-_cropped.jpg",
      address: "27th North Road, 32567 New York",
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Treking in India",
      subtitle: "Lets go for a trek",
      description: "Best places to trek in India",
      imageUrl:
        "https://images.thrillophilia.com/image/upload/s--OxgUOv8c--/c_fill,dpr_1.0,f_auto,fl_strip_profile,g_center,h_183,q_auto,w_245/v1/images/photos/000/022/281/original/1516271288_Chadar-Trek.png.jpg",
      address: "50 South Road, 411013 Pune",
      contactEmail: "trek@test.com",
      isFavorite: false
    }
  ];

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      contactEmail: event.detail.email,
      address: event.detail.address
    };
    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function togglefavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find(m => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }

  function cancelEdit() {
    editMode = null;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
<div class="meetup-controls">
<Button on:click={() => (editMode = 'add')} >New Meetup</Button>
</div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={togglefavorite} />
</main>
