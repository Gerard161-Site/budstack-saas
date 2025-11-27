import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function exportData() {
  console.log('📦 Exporting existing data...');

  // This file is deprecated - use export-existing-data-sql.ts instead
  console.log('⚠️  This export script is deprecated. Database schema has changed.');
  console.log('Use export-existing-data-sql.ts instead for raw SQL export.');
}

exportData()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
