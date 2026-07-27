const avatar = (seed) => `https://i.pravatar.cc/160?img=${seed}`;

export const testimonials = [
  {
    name: 'Ananya Rao',
    role: 'CTO, MediVision',
    rating: 5,
    avatar: avatar(47),
    quote:
      'TechNova delivered a production ML pipeline that our radiologists actually trust. Communication was flawless and the results beat our targets.',
  },
  {
    name: 'Marcus Feld',
    role: 'Founder, InsightFlow',
    rating: 5,
    avatar: avatar(12),
    quote:
      'They turned a messy spreadsheet workflow into a gorgeous real-time dashboard in six weeks. Best engineering partner we have worked with.',
  },
  {
    name: 'Priya Nair',
    role: 'Product Lead, ShopWave',
    rating: 5,
    avatar: avatar(32),
    quote:
      'Conversion jumped 32% after the rebuild. The team cares about the details — animations, performance, accessibility, everything.',
  },
  {
    name: 'David Chen',
    role: 'Head of Data, Sentinel Bank',
    rating: 5,
    avatar: avatar(15),
    quote:
      'Our fraud detection accuracy more than doubled. TechNova brought real ML rigor and shipped on time.',
  },
  {
    name: 'Sofia Alvarez',
    role: 'Research Fellow',
    rating: 5,
    avatar: avatar(45),
    quote:
      'They reproduced a difficult paper and documented every experiment. Exactly the reliability researchers need.',
  },
  {
    name: 'James O’Brien',
    role: 'COO, AgriStream',
    rating: 4,
    avatar: avatar(51),
    quote:
      'The automation pipeline cut our water usage by nearly a third. Thoughtful engineers who understand the business impact.',
  },
];
