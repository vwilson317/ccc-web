import { Barraca } from '../types/barraca';

const IMAGE_BASE_URL = 'https://pub-fd0887d0f17643f890cee102554548a1.r2.dev/JPEG';

// Generate next 14 days of 24/7 hours
const generate24_7Hours = () => {
  const hours = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    hours.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD format
      open: "00:00",
      close: "23:59"
    });
  }
  
  return hours;
};

const defaultHours = generate24_7Hours();

export const barracas: Barraca[] = [
//   {
//     id: 80,
//     title: "#80 - Uruguay",
//     description: "Creators personal favorite. They're always super friendly and wont rip off gringos :)",
//     imageUrl: '/assets/barraca-80.jpg',
//     hours: [
//       { date: "2025-05-13", open: "00:00", close: "23:59" },
//       { date: "2025-01-21", open: "09:00", close: "17:00" },
//       { date: "2025-01-22", open: "09:00", close: "17:00" },
//       { date: "2025-01-28", open: "09:00", close: "17:00" }
//     ],
//     menuUri: "/assets/80-menu.jpg",
//     paymentsEnabled: true,
//     acceptedPayments: ['VISA', 'PIX', 'PayPal']
//   },
//   {
//     id: 20,
//     title: "#20 - Rasta",
//     description: "Another one of our favorites. If you're in leme it's always a good vibe.",
//     imageUrl: '/assets/20-default.jpeg',
//     hours: [
//       { date: "2025-01-28", open: "09:00", close: "17:00" }
//     ]
//   },
//   {
//     id: 0,
//     title: "Testing (#0)",
//     description: `Mock barraca, not real. Just testing if most of the info is missing for a barraca. 
//     might make sense to not display it i there's no menu or operating hours.`,
//     imageUrl: "/assets/oh-crap.png"
//   },
  {
    id: 7,
    title: "#7",
    description: "Barraca 7",
    imageUrl: `${IMAGE_BASE_URL}/7.jpg`,
    hours: defaultHours,
    neighborhood: 'Leblon'
  },
  {
    id: 10,
    title: "#10",
    description: "Barraca 10",
    imageUrl: `${IMAGE_BASE_URL}/10.jpg`,
    hours: defaultHours,
    neighborhood: 'Leme'
  },
  {
    id: 11,
    title: "#11",
    description: "Barraca 11",
    imageUrl: `${IMAGE_BASE_URL}/11.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  },
  {
    id: 15,
    title: "#15",
    description: "Barraca 15",
    imageUrl: `${IMAGE_BASE_URL}/15.jpg`,
    hours: defaultHours,
    neighborhood: 'Copacabana'
  },
  {
    id: 27,
    title: "#27",
    description: "Barraca 27",
    imageUrl: `${IMAGE_BASE_URL}/27.jpg`,
    hours: defaultHours,
    neighborhood: 'Leblon'
  },
  {
    id: 32,
    title: "#32",
    description: "Barraca 32",
    imageUrl: `${IMAGE_BASE_URL}/32.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  },
  {
    id: 50,
    title: "#50",
    description: "Barraca 50",
    imageUrl: `${IMAGE_BASE_URL}/50.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  },
  {
    id: 52,
    title: "#52x",
    description: "Barraca 52x",
    imageUrl: `${IMAGE_BASE_URL}/52x.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  },
  {
    id: 56,
    title: "#56",
    description: "Barraca 56",
    imageUrl: `${IMAGE_BASE_URL}/56.jpg`,
    hours: defaultHours,
    neighborhood: 'Leme'
  },
  {
    id: 57,
    title: "#57",
    description: "Barraca 57",
    imageUrl: `${IMAGE_BASE_URL}/57x.jpg`,
    hours: defaultHours,
    neighborhood: 'Leblon'
  },
  {
    id: 60,
    title: "#60",
    description: "Barraca 60",
    imageUrl: `${IMAGE_BASE_URL}/60.jpg`,
    hours: defaultHours,
    neighborhood: 'Copacabana'
  },
  {
    id: 65,
    title: "#65",
    description: "Barraca 65",
    imageUrl: `${IMAGE_BASE_URL}/65.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  },
  {
    id: 71,
    title: "#71",
    description: "Barraca 71",
    imageUrl: `${IMAGE_BASE_URL}/71.jpg`,
    hours: defaultHours,
    neighborhood: 'Leme'
  },
  {
    id: 79,
    title: "#79",
    description: "Barraca 79",
    imageUrl: `${IMAGE_BASE_URL}/79.jpg`,
    hours: defaultHours,
    neighborhood: 'Leblon'
  },
  {
    id: 91,
    title: "#91",
    description: "Barraca 91",
    imageUrl: `${IMAGE_BASE_URL}/91.jpg`,
    hours: defaultHours,
    neighborhood: 'Copacabana'
  },
  {
    id: 98,
    title: "#98",
    description: "Barraca 98",
    imageUrl: `${IMAGE_BASE_URL}/98.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  },
  {
    id: 100,
    title: "#100",
    description: "Barraca 100",
    imageUrl: `${IMAGE_BASE_URL}/100.jpg`,
    hours: defaultHours,
    neighborhood: 'Leme'
  },
  {
    id: 102,
    title: "#102",
    description: "Barraca 102",
    imageUrl: `${IMAGE_BASE_URL}/102.jpg`,
    hours: defaultHours,
    neighborhood: 'Leblon'
  },
  {
    id: 117,
    title: "#117",
    description: "Barraca 117",
    imageUrl: `${IMAGE_BASE_URL}/117.jpg`,
    hours: defaultHours,
    neighborhood: 'Copacabana'
  },
  {
    id: 120,
    title: "#120",
    description: "Barraca 120",
    imageUrl: `${IMAGE_BASE_URL}/120.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  },
  {
    id: 135,
    title: "#135",
    description: "Barraca 135",
    imageUrl: `${IMAGE_BASE_URL}/135.jpg`,
    hours: defaultHours,
    neighborhood: 'Leme'
  },
  {
    id: 137,
    title: "#137",
    description: "Barraca 137",
    imageUrl: `${IMAGE_BASE_URL}/137.jpg`,
    hours: defaultHours,
    neighborhood: 'Leblon'
  },
  {
    id: 145,
    title: "#145",
    description: "Barraca 145",
    imageUrl: `${IMAGE_BASE_URL}/145.jpg`,
    hours: defaultHours,
    neighborhood: 'Copacabana'
  },
  {
    id: 147,
    title: "#147",
    description: "Barraca 147",
    imageUrl: `${IMAGE_BASE_URL}/147.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  },
  {
    id: 150,
    title: "#150",
    description: "Barraca 150",
    imageUrl: `${IMAGE_BASE_URL}/150.jpg`,
    hours: defaultHours,
    neighborhood: 'Leme'
  },
  {
    id: 156,
    title: "#156",
    description: "Barraca 156",
    imageUrl: `${IMAGE_BASE_URL}/156.jpg`,
    hours: defaultHours,
    neighborhood: 'Leblon'
  },
  {
    id: 181,
    title: "#181",
    description: "Barraca 181",
    imageUrl: `${IMAGE_BASE_URL}/181.jpg`,
    hours: defaultHours,
    neighborhood: 'Copacabana'
  },
  {
    id: 9,
    title: "Posto 9",
    description: "Posto 9 Barraca",
    imageUrl: `${IMAGE_BASE_URL}/posto9.jpg`,
    hours: defaultHours,
    neighborhood: 'Ipanema'
  }
]; 