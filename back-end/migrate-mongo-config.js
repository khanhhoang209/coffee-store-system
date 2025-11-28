require('dotenv').config({ quiet: true })

const config = {
  mongodb: {
    url: process.env.MONGO_URI,
    options: {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'change_logs',
  lockCollectionName: 'changelog_lock',
  lockTtl: 0,
  migrationFileExtension: '.js',
  useFileHash: false,
  moduleSystem: 'commonjs',
}

module.exports = config
