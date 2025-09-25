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
    description:
      "A historic boxing showdown as Anthony Joshua takes on Daniel Dubois at Teslim Balogun Stadium. Witness power, speed, and raw determination in one of the most anticipated fights of the year.",
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
    description:
      "MMA warriors Khalil Rountree and Alex Perreira clash in a high-stakes UFC bout streamed live online. Expect explosive strikes, intense grappling, and non-stop adrenaline.",
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
  description:
    "Legendary British heavy metal band Iron Maiden rocked the stage at Teslim Balogun Stadium in Surulere, Lagos, delivering an electrifying performance that left fans in awe. With their iconic stage presence, powerful vocals, and epic guitar solos, Iron Maiden treated the crowd to a night of timeless classics and fan favorites. The stadium buzzed with energy as thousands of metalheads sang along to hits like \"The Trooper\" and \"Run to the Hills,\" marking a historic moment in Nigeria's music scene. It was an unforgettable concert, cementing Iron Maiden's legacy as global heavy metal icons.",
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
    description:
      "The Experience returns in 2024, bringing together thousands for a powerful night of worship, praise, and teaching. A spiritual and musical encounter unlike any other.",
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
    description:
      "A comprehensive online training session covering SEO, social media, paid ads, and email marketing strategies. Learn how to grow your business digitally in today’s market.",
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
    description:
      "End the year with Lagos’ wildest house party! Music, drinks, dance battles, and nonstop fun till sunrise. The ultimate Detty December experience awaits.",
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
    description:
      "The Mainland Block Party is back! Expect high-energy performances, top DJs, food, fashion, and street vibes — a cultural celebration for the young and restless.",
    pricing: [
      { type: "Free", price: 0 }
    ]
  }
];
