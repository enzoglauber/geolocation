import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const baseLatitude = -23.5356837
  const baseLongitude = -46.5244254

  // Helper para calcular coordenadas
  const generateCoordinates = (lat: number, lon: number, distanceKm: number): string => {
    const earthRadiusKm = 6371 // Raio da Terra em km
    const deltaLat = (distanceKm / earthRadiusKm) * (180 / Math.PI) // Deslocamento em latitude
    const deltaLon = (distanceKm / (earthRadiusKm * Math.cos((Math.PI * lat) / 180))) * (180 / Math.PI) // Deslocamento em longitude
    return `POINT(${lon + deltaLon} ${lat + deltaLat})`
  }

  // Criar usuários
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: 'User One',
      password: 'password1'
    }
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'User Two',
      password: 'password2'
    }
  })

  // Endereços
  const addresses = [
    {
      name: 'Address 1 (Less than 1 km)',
      location: generateCoordinates(baseLatitude, baseLongitude, 0.8),
      userId: user1.id
    },
    {
      name: 'Address 2 (Less than 1 km)',
      location: generateCoordinates(baseLatitude, baseLongitude, 0.5),
      userId: user1.id
    },
    {
      name: 'Address 3 (3-5 km)',
      location: generateCoordinates(baseLatitude, baseLongitude, 3.2),
      userId: user2.id
    },
    {
      name: 'Address 4 (3-5 km)',
      location: generateCoordinates(baseLatitude, baseLongitude, 4.7),
      userId: user2.id
    },
    {
      name: 'Address 5 (3-5 km)',
      location: generateCoordinates(baseLatitude, baseLongitude, 3.5),
      userId: user2.id
    },
    {
      name: 'Address 6 (More than 5 km)',
      location: generateCoordinates(baseLatitude, baseLongitude, 6.1),
      userId: user1.id
    }
  ]

  // Inserir os endereços no banco
  for (const address of addresses) {
    await prisma.$executeRaw`INSERT INTO "Address" (name, location, "userId", "createdAt", "updatedAt") 
                              VALUES (${address.name}, ST_GeomFromText(${address.location}, 4326), ${address.userId}, NOW(), NOW())`
  }

  console.log('Seed concluído com sucesso!')
}

// Execute a função principal
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
