const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.recoveryRule.deleteMany();
  await prisma.auditEvent.deleteMany();
  await prisma.recoveryAction.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.merchant.deleteMany();

  const merchant = await prisma.merchant.create({
    data: {
      name: 'Demo Merchant',
      email: 'demo@merchant.com',
      rules: {
        create: {
          maxAttempts: 2,
          minAmount: 100,
          maxDiscount: 10,
          cooldownHours: 24,
          requireApproval: true
        }
      }
    }
  });

  // deterministic customers
  const customers = [];
  for(let i=0; i<30; i++) {
    customers.push({
      merchantId: merchant.id,
      name: `Customer ${i}`,
      email: `customer${i}@example.com`,
      phone: `+15550000${i.toString().padStart(2, '0')}`,
      totalSpend: (10 + i) * 1000,
      successfulPayments: 2 + (i % 5),
      failedPayments: i % 3
    });
  }

  await prisma.customer.createMany({ data: customers });
  const allCustomers = await prisma.customer.findMany();

  // deterministic transactions
  const txData = [];
  const failureReasons = ['insufficient funds', 'expired card', 'bank/network issue', 'authentication failure', 'temporary payment degradation', 'repeated failure'];

  let amountCounter = 2000;
  for(let i=0; i<100; i++) {
    const isRecoverable = i % 3 === 0;
    txData.push({
      merchantId: merchant.id,
      customerId: allCustomers[i % allCustomers.length].id,
      amount: amountCounter + (i * 100),
      currency: 'INR',
      status: 'failed',
      failureReason: failureReasons[i % failureReasons.length],
      retryCount: isRecoverable ? 0 : 2,
      recoveryScore: isRecoverable ? 0.8 + (i % 10)*0.01 : 0.2 + (i % 10)*0.01,
      recoveryStatus: 'pending'
    });
  }

  await prisma.transaction.createMany({ data: txData });

  console.log('Seeded successfully!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
