/**
 * Structured Tourist Location Database for Destination Autocomplete & Coordinates
 */

export const DESTINATION_SUGGESTIONS = [
  {
    id: 'dest-mussoorie',
    name: 'Mussoorie',
    city: 'Mussoorie',
    state: 'Uttarakhand',
    country: 'India',
    fullName: 'Mussoorie, Uttarakhand, India',
    lat: 30.4598,
    lng: 78.0644,
    popular: true,
    description: 'Queen of the Hills with misty ridge walks, waterfalls, and colonial charm.'
  },
  {
    id: 'dest-dehradun',
    name: 'Dehradun',
    city: 'Dehradun',
    state: 'Uttarakhand',
    country: 'India',
    fullName: 'Dehradun, Uttarakhand, India',
    lat: 30.3165,
    lng: 78.0322,
    popular: true,
    description: 'Capital valley hub with ancient caves, temples, and hill gateways.'
  },
  {
    id: 'dest-rishikesh',
    name: 'Rishikesh',
    city: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    fullName: 'Rishikesh, Uttarakhand, India',
    lat: 30.0869,
    lng: 78.2676,
    popular: true,
    description: 'Yoga capital of the world by the holy Ganges with white water rafting.'
  },
  {
    id: 'dest-manali',
    name: 'Manali',
    city: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    fullName: 'Manali, Himachal Pradesh, India',
    lat: 32.2432,
    lng: 77.1892,
    popular: true,
    description: 'Himalayan resort town known for valley views, paragliding, and snow passes.'
  },
  {
    id: 'dest-jaipur',
    name: 'Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    fullName: 'Jaipur, Rajasthan, India',
    lat: 26.9124,
    lng: 75.7873,
    popular: true,
    description: 'Pink City featuring grand royal palaces, desert forts, and bazaars.'
  },
  {
    id: 'dest-goa',
    name: 'Goa',
    city: 'Goa',
    state: 'Goa',
    country: 'India',
    fullName: 'Goa, India',
    lat: 15.2993,
    lng: 74.1240,
    popular: true,
    description: 'Tropical paradise known for golden beaches, nightlife, and Portuguese heritage.'
  },
  {
    id: 'dest-kyoto',
    name: 'Kyoto',
    city: 'Kyoto',
    state: 'Kyoto Prefecture',
    country: 'Japan',
    fullName: 'Kyoto, Kansai, Japan',
    lat: 35.0116,
    lng: 135.7681,
    popular: false,
    description: 'Cultural heart of Japan with classical Buddhist temples and bamboo groves.'
  }
];

export function findDestinationByQuery(query = '') {
  if (!query || query.trim() === '') return DESTINATION_SUGGESTIONS[0];
  const q = query.toLowerCase();

  const match = DESTINATION_SUGGESTIONS.find(d => 
    d.name.toLowerCase().includes(q) || 
    d.fullName.toLowerCase().includes(q) ||
    d.city.toLowerCase().includes(q)
  );

  if (match) return match;

  return {
    id: `custom-${q}`,
    name: query,
    city: query,
    state: '',
    country: 'India',
    fullName: `${query}, India`,
    lat: 30.4598,
    lng: 78.0644,
    popular: false,
    description: 'Selected tourist destination'
  };
}
