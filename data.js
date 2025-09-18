import anthonyJoshua from './src/assets/anthony-joshua-vs-dubois.png'
import dettyDecember from './src/assets/detty-december.png'
import digitalMarketing from './src/assets/digital-marketing.png'
import ironMaiden from './src/assets/iron-maiden.png'
import khalilRountree from './src/assets/khalil-rountree-vs-alex-perierra.png'
import mainlandBlockParty from './src/assets/mainland-block-party.png'
import theExperience from './src/assets/the-experience.png'





export const events = [
  {
    id: 1,
    img: anthonyJoshua,
    title: "Anthony Joshua VS Dubois",
    host: "World Boxing Federation",
    categories: ["Sports", "Boxing"],
    location: "Teslim Balogun Stadium, Surulere",
    date: "Aug 30, 2024",
    pricing: [
      { type: "Regular", price: 5000 },
      { type: "VIP", price: 10000 },
      { type: "Ringside", price: 20000 }
    ]
  },
  {
    id: 2,
    img: khalilRountree,
    title: "Khalil Rountree VS Alex Perreira",
    host: "UFC",
    categories: ["Sports", "MMA", "Online"],
    location: "Online",
    date: "Aug 30, 2024",
    pricing: [
      { type: "Regular", price: 3000 },
      { type: "VIP", price: 7000 }
    ]
  },
  {
    id: 3,
    img: ironMaiden,
    title: "Iron Maiden World Tour 2024",
    host: "Iron Maiden",
    categories: ["Concert", "Music", "Entertainment"],
    location: "Teslim Balogun Stadium, Surulere",
    date: "Aug 30, 2024",
    pricing: [
      { type: "Regular", price: 5000 },
      { type: "VIP", price: 10000 }
    ]
  },
  {
    id: 4,
    img: theExperience,
    title: "The Experience 2024",
    host: "Mubby Money",
    categories: ["Education", "Faith", "Music"],
    location: "Teslim Balogun Stadium, Surulere",
    date: "Oct 30, 2024",
    pricing: [
      { type: "Free", price: 0 }
    ]
  },
  {
    id: 5,
    img: digitalMarketing,
    title: "Digital Marketing Course Part",
    host: "Mubarak Johnson",
    categories: ["Education", "Business", "Online"],
    location: "Online",
    date: "Oct 30, 2024",
    pricing: [
      { type: "Regular", price: 4000 },
      { type: "VIP", price: 8000 },
      { type: "VVIP", price: 15000 }
    ]
  },
  {
    id: 6,
    img: dettyDecember,
    title: "Detty December House Party",
    host: "Party Freaks",
    categories: ["Party", "Nightlife", "Music"],
    location: "Euphoria House 9",
    date: "Oct 30, 2024",
    pricing: [
      { type: "Regular", price: 5000 },
      { type: "VIP", price: 12000 }
    ]
  },
  {
    id: 7,
    img: mainlandBlockParty,
    title: "Mainland Block Party",
    host: "DJ Chicken",
    categories: ["Party", "Concert", "Music"],
    location: "Teslim Balogun Stadium, Surulere",
    date: "Oct 30, 2024",
    pricing: [
      { type: "Free", price: 0 }
    ]
  }
];
