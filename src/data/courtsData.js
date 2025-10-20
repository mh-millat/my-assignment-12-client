// const courts = [
//     { id: 1, name: 'Tennis Court A', type: 'Tennis', price: 500, image: 'https://i.ibb.co/3mJHTQLq/04-tennis.jpg' },
//     { id: 2, name: 'Badminton Court B', type: 'Badminton', price: 400, image: 'https://i.ibb.co/h1WL8QHf/31-dbed9f75-0945-43b6-828d-fed432c22ec2.webp' },
//     { id: 3, name: 'Squash Court C', type: 'Squash', price: 450, image: 'https://i.ibb.co/pBY9Mhhn/a-tennis-match-600x.webp' },
//     { id: 4, name: 'Tennis Court D', type: 'Tennis', price: 500, image: 'https://i.ibb.co/vCrF78YL/courts-scaled.jpg' },
//     { id: 5, name: 'Badminton Court E', type: 'Badminton', price: 400, image: 'https://i.ibb.co/234WT8Nd/Document.jpg' },
//     { id: 6, name: 'Squash Court F', type: 'Squash', price: 450, image: 'https://i.ibb.co/XQpmkpB/Hi-Pertennistiles7.webp' },
//     { id: 7, name: 'Tennis Court G', type: 'Tennis', price: 500, image: 'https://i.ibb.co/BKn3jytJ/How-many-pickleball-courts-fit-tennis-1024x768.jpg' },
//     { id: 8, name: 'Badminton Court H', type: 'Badminton', price: 400, image: 'https://i.ibb.co/2YmsW2XV/images.jpg' },
//     { id: 9, name: 'Squash Court I', type: 'Squash', price: 450, image: 'https://i.ibb.co/XrTW4GTV/indoor-tennis-court-direct-lighting.jpg' },
//     { id: 10, name: 'Tennis Court J', type: 'Tennis', price: 500, image: 'https://i.ibb.co/hx6sLNY9/Innenansicht-auf-das-Spielfeld-einer-Tennishalle.jpg' },
//     { id: 11, name: 'Badminton Court K', type: 'Badminton', price: 400, image: 'https://i.ibb.co/ZRw4rvRp/tennis-court-dimensions-1024x576.webp' },
//     { id: 11, name: 'Badminton Court K', type: 'Badminton', price: 400, image: 'https://i.ibb.co/MDmTP5gZ/The-Future-of-Tennis-Courts.jpg' }
// ]

// export default courts


const courts = [
  { id: 1, name: 'Tennis Court A', type: 'Tennis', price: 500, image: 'https://i.ibb.co/3mJHTQLq/04-tennis.jpg' },
  { id: 2, name: 'Badminton Court B', type: 'Badminton', price: 400, image: 'https://i.ibb.co/h1WL8QHf/31-dbed9f75-0945-43b6-828d-fed432c22ec2.webp' },
  { id: 3, name: 'Squash Court C', type: 'Squash', price: 450, image: 'https://i.ibb.co/pBY9Mhhn/a-tennis-match-600x.webp' },
  { id: 4, name: 'Tennis Court D', type: 'Tennis', price: 500, image: 'https://i.ibb.co/vCrF78YL/courts-scaled.jpg' },
  { id: 5, name: 'Badminton Court E', type: 'Badminton', price: 400, image: 'https://i.ibb.co/234WT8Nd/Document.jpg' },
  { id: 6, name: 'Squash Court F', type: 'Squash', price: 450, image: 'https://i.ibb.co/XQpmkpB/Hi-Pertennistiles7.webp' },
  { id: 7, name: 'Tennis Court G', type: 'Tennis', price: 500, image: 'https://i.ibb.co/BKn3jytJ/How-many-pickleball-courts-fit-tennis-1024x768.jpg' },
  { id: 8, name: 'Badminton Court H', type: 'Badminton', price: 400, image: 'https://i.ibb.co/2YmsW2XV/images.jpg' },
  { id: 9, name: 'Squash Court I', type: 'Squash', price: 450, image: 'https://i.ibb.co/XrTW4GTV/indoor-tennis-court-direct-lighting.jpg' },
  { id: 10, name: 'Tennis Court J', type: 'Tennis', price: 500, image: 'https://i.ibb.co/hx6sLNY9/Innenansicht-auf-das-Spielfeld-einer-Tennishalle.jpg' },
  { id: 11, name: 'Badminton Court K', type: 'Badminton', price: 400, image: 'https://i.ibb.co/ZRw4rvRp/tennis-court-dimensions-1024x576.webp' },
  { id: 12, name: 'Squash Court L', type: 'Squash', price: 450, image: 'https://i.ibb.co/MDmTP5gZ/The-Future-of-Tennis-Courts.jpg' },
];

for (let i = 13; i <= 100; i++) {
  const base = courts[(i - 1) % 12];
  courts.push({
    id: i,
    name: `${base.name.split(' ')[0]} Court ${String.fromCharCode(64 + (i % 26 || 26))}${i}`,
    type: base.type,
    price: base.price,
    image: base.image,
  });
}

export default courts;
