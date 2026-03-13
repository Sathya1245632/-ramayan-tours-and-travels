import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { destinations, packages, reviews } from '../src/lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.package.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@ramayantours.com',
      password: 'JaiShriRam@2025', // In production, use hashed passwords
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user');

  // Create destinations
  for (const dest of destinations) {
    await prisma.destination.create({
      data: {
        name: dest.name,
        state: dest.state,
        description: dest.description,
        image: dest.image,
        temples: dest.temples?.length || 0,
        rating: dest.rating || 4.5,
        category: dest.category || 'Spiritual',
        featured: false,
      },
    });
  }

  console.log('✅ Created destinations');

  // Create packages
  for (const pkg of packages) {
    await prisma.package.create({
      data: {
        name: pkg.name,
        price: pkg.price,
        duration: pkg.duration,
        hotelType: pkg.hotelType || 'Standard',
        highlights: pkg.highlights || [],
        includes: pkg.inclusions || [],
        rating: pkg.rating || 4.5,
        reviews: pkg.reviews || 0,
        featured: false,
        destinationId: null,
      },
    });
  }

  console.log('✅ Created packages');

  // Create reviews
  for (const review of reviews) {
    await prisma.review.create({
      data: {
        name: review.name,
        location: review.location,
        rating: review.rating,
        comment: review.review,
        packageName: review.package,
        approved: true,
      },
    });
  }

  console.log('✅ Created reviews');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
