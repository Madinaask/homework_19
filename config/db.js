import mongoose from 'mongoose'

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri)
    console.log('MongoDB подключена')
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error.message)
    process.exit(1)
  }
}
