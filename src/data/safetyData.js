export const EMERGENCY_CONTACTS = [
  {
    id: 'police',
    title: 'Police / Law Enforcement',
    number: '110',
    globalAlt: '112 / 911',
    description: 'For immediate crime reports, accidents, or urgent police assistance.',
    color: 'rose',
    icon: 'ShieldAlert'
  },
  {
    id: 'ambulance',
    title: 'Ambulance & Medical ER',
    number: '119',
    globalAlt: '112 / 911',
    description: 'For life-threatening medical emergencies and urgent ambulance dispatches.',
    color: 'red',
    icon: 'HeartPulse'
  },
  {
    id: 'fire',
    title: 'Fire Department',
    number: '119',
    globalAlt: '112 / 911',
    description: 'For fires, chemical hazards, and search & rescue operations.',
    color: 'amber',
    icon: 'Flame'
  },
  {
    id: 'tourist',
    title: '24/7 Tourist Helpline',
    number: '+81 50-3816-2720',
    globalAlt: '1363 / Toll-Free',
    description: 'Multilingual support for tourist advice, lost passports, and translation.',
    color: 'sky',
    icon: 'PhoneCall'
  }
];

export const NEARBY_SERVICES = [
  {
    id: 'hosp-1',
    name: 'Kyoto University Hospital (24/7 ER)',
    category: 'Hospital',
    distanceKm: 1.1,
    address: '54 Shogoin Kawaharacho, Sakyo Ward, Kyoto',
    phone: '+81 75-751-3111',
    status: 'Open 24/7 ER',
    englishStaff: true,
    lat: 35.0189,
    lng: 135.7765
  },
  {
    id: 'hosp-2',
    name: 'Red Cross International Medical Center',
    category: 'Hospital',
    distanceKm: 2.4,
    address: '15 Honmachi, Higashiyama Ward, Kyoto',
    phone: '+81 75-561-1121',
    status: 'Open 24/7 ER',
    englishStaff: true,
    lat: 34.9875,
    lng: 135.7721
  },
  {
    id: 'pol-1',
    name: 'Gion Central Police Station (Koban)',
    category: 'Police Station',
    distanceKm: 0.4,
    address: 'Gionmachi Minamigawa, Higashiyama, Kyoto',
    phone: '+81 75-525-0110',
    status: '24/7 Police Patrol',
    englishStaff: true,
    lat: 35.0034,
    lng: 135.7742
  },
  {
    id: 'pol-2',
    name: 'Kyoto Station Metropolitan Police Box',
    category: 'Police Station',
    distanceKm: 1.8,
    address: 'Kyoto Station Central Gate, Shimogyo Ward',
    phone: '+81 75-371-0110',
    status: '24/7 Police Patrol',
    englishStaff: true,
    lat: 34.9858,
    lng: 135.7583
  },
  {
    id: 'pharm-1',
    name: 'Matsumoto Kiyoshi 24/7 International Pharmacy',
    category: 'Pharmacy',
    distanceKm: 0.6,
    address: 'Kawaramachi Shopping Street #28, Kyoto',
    phone: '+81 75-256-8800',
    status: 'Open 24 Hours',
    englishStaff: false,
    lat: 35.0051,
    lng: 135.7692
  },
  {
    id: 'pharm-2',
    name: 'Sugi Pharmacy & First Aid Supply',
    category: 'Pharmacy',
    distanceKm: 1.3,
    address: 'Sanjo Dori Promenade, Nakagyo Ward, Kyoto',
    phone: '+81 75-223-4199',
    status: 'Open until 11:00 PM',
    englishStaff: false,
    lat: 35.0089,
    lng: 135.7634
  }
];

export const SAFETY_ADVISORIES = [
  {
    title: 'Earthquake & Natural Disaster Protocol',
    desc: 'If an earthquake strikes, Drop, Cover, and Hold On. Stay away from glass windows and seek shelter under sturdy furniture or open park spaces.'
  },
  {
    title: 'Keep Digital & Paper Passport Copies',
    desc: 'Store a photo of your passport ID page on your phone and keep a printed copy in your luggage separate from your physical passport.'
  },
  {
    title: 'Avoid Unofficial Taxi Touts',
    desc: 'Only enter licensed taxis with official meter displays or registered ride-hailing app services.'
  }
];
