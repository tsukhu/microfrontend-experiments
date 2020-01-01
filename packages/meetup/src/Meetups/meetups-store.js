import { writable } from "svelte/store";

const meetups = writable([
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
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: meetupData => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false
    };
    meetups.update(items => {
      return [newMeetup, ...items];
    });
  },
  toggleFavorite: id => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find(m => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex(m => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  }
};
export default customMeetupsStore;
