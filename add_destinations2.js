const fs = require('fs');

const file = 'src/lib/data.ts';
let code = fs.readFileSync(file, 'utf8');

const cities = ['Chennai', 'Mahabalipuram', 'Pondicherry', 'Kanchipuram', 'Velankanni', 'Thanjavur', 'Kumbakonam', 'Trichy', 'Palani', 'Kodaikanal', 'Munnar', 'Thekkady', 'Alleppey', 'Cochin', 'Ooty', 'Coimbatore', 'Bangalore', 'Mysore', 'Coorg', 'Goa', 'Hyderabad'];

const newDestinations = cities.map(city => {
  const id = city.toLowerCase();
  return `    {
        id: '${id}',
        name: '${city}',
        state: 'South India',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
        description: 'Explore the divine beauty and rich heritage of ${city}.',
        rating: 4.8,
        reviews: Math.floor(Math.random() * 5000) + 1000,
        bestTime: 'October – March',
        duration: '2–3 days',
        highlights: ['Major Attractions', 'Local Culture', 'City Tour', 'Famous Temple'],
        category: 'Heritage',
        price: 5999,
        temples: ['Main Temple of ${city}'],
        hotels: ['Premium Stay ${city}', 'Budget Stay ${city}'],
        travelTips: [
            'Plan your visit early.',
            'Try the local cuisine.',
            'Check local timings for temples and attractions.'
        ],
    }`;
});

code = code.replace(/    \},\r?\n\];\r?\n\r?\nexport const packages =/, "    },\n" + newDestinations.join(",\n") + "\n];\n\nexport const packages =");

fs.writeFileSync(file, code);

console.log('Successfully added ' + cities.length + ' destinations.');
