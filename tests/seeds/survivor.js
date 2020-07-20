module.exports = [
  {
    id: 'batman',
    name: 'Batman',
    age: '40',
    gender: 'm',
    latitude: 10,
    longitude: -10,
    inventory: {
      'Fiji Water': 41,
      'Campbell Soup': 36,
      'First Aid Pouch': 43,
      AK47: 0,
    },
  },
  {
    id: 'robin',
    name: 'Robin',
    age: '22',
    gender: 'f',
    latitude: -78,
    longitude: -14,
    inventory: {
      'Fiji Water': 13,
      'Campbell Soup': 7,
      'First Aid Pouch': 5,
      AK47: 4,
    },
  },
  {
    id: 'wonderwoman',
    name: 'Wonder Woman',
    age: '39',
    gender: 'f',
    latitude: 90,
    longitude: 0,
    inventory: {
      'Fiji Water': 34,
      'Campbell Soup': 24,
      'First Aid Pouch': 2,
      AK47: 9,
    },
  },
  {
    id: 'joker',
    name: 'Joker',
    age: '46',
    gender: 'm',
    latitude: -30,
    longitude: 116,
    inventory: {
      'Fiji Water': 12,
      'Campbell Soup': 42,
      'First Aid Pouch': 7,
      AK47: 13,
    },
  },
  {
    id: 'alfred',
    name: 'Alfred',
    age: '70',
    gender: 'm',
    latitude: 80,
    longitude: 2,
    inventory: {
      'Fiji Water': 9,
      'Campbell Soup': 8,
      'First Aid Pouch': 10,
      AK47: 0,
    },
    flaggedBy: ['wonderwoman', 'joker', 'harleyquinn', 'penguin', 'catwoman'],
  },
  {
    id: 'harleyquinn',
    name: 'Harley Quinn',
    age: '31',
    gender: 'f',
    latitude: -43,
    longitude: 101,
    inventory: {
      'Fiji Water': 22,
      'Campbell Soup': 21,
      'First Aid Pouch': 14,
      AK47: 5,
    },
    flaggedBy: ['robin', 'wonderwoman', 'alfred', 'penguin'],
  },
  {
    id: 'penguin',
    name: 'Penguin',
    age: '46',
    gender: 'm',
    latitude: -43,
    longitude: 101,
    inventory: {
      'Fiji Water': 5,
      'Campbell Soup': 11,
      'First Aid Pouch': 13,
      AK47: 6,
    },
    flaggedBy: ['batman', 'robin', 'wonderwoman', 'joker', 'harleyquinn'],
  },
  {
    id: 'catwoman',
    name: 'Catwoman',
    age: '35',
    gender: 'f',
    latitude: 83,
    longitude: 51,
    inventory: {
      'Fiji Water': 30,
      'Campbell Soup': 6,
      'First Aid Pouch': 30,
      AK47: 3,
    },
  },
]
