const argon2 = require('argon2')
require('dotenv').config()

const ROLE_NAME = {
  ADMIN: 'Admin',
  USER: 'User',
  STAFF: 'Staff',
}

const COLLECTIONS = {
  ROLES: 'roles',
  USERS: 'users',
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  ORDER_DETAILS: 'order_details',
}

const INDEX_NAME = {
  USER_EMAIL_INDEX: 'users_email_idx',
  ROLE_NAME_INDEX: 'roles_name_idx',
  PRODUCT_NAME_INDEX: 'products_name_idx',
  CATEGORY_NAME_INDEX: 'categories_name_idx',
  ORDER_USER_INDEX: 'orders_user_idx',
  ORDER_DETAIL_ORDER_INDEX: 'order_details_order_idx',
}

const argonConfig = {
  type: parseInt(process.env.ARGON_TYPE, 10),
  timeCost: parseInt(process.env.ARGON_TIME_COST, 10),
  memoryCost: parseInt(process.env.ARGON_MEMORY_COST, 10),
  parallelism: parseInt(process.env.ARGON_PARALLELISM, 10),
  hashLength: parseInt(process.env.ARGON_HASH_LENGTH, 10),
}

async function hashPassword(password) {
  return argon2.hash(password, argonConfig)
}

// --- INDEX OPTIONS ---

/**
 * Create necessary indexes
 * @param db {import('mongodb').Db}
 */
async function createIndexes(db) {
  await db
    .collection(COLLECTIONS.USERS)
    .createIndex(
      { email: 1 },
      { name: INDEX_NAME.USER_EMAIL_INDEX, unique: true }
    )

  await db
    .collection(COLLECTIONS.ROLES)
    .createIndex(
      { name: 1 },
      { name: INDEX_NAME.ROLE_NAME_INDEX, unique: true }
    )

  await db
    .collection(COLLECTIONS.PRODUCTS)
    .createIndex({ name: 1 }, { name: INDEX_NAME.PRODUCT_NAME_INDEX })

  await db
    .collection(COLLECTIONS.CATEGORIES)
    .createIndex(
      { name: 1 },
      { name: INDEX_NAME.CATEGORY_NAME_INDEX, unique: true }
    )

  // Orders: tìm orders theo user
  await db
    .collection(COLLECTIONS.ORDERS)
    .createIndex({ user: 1 }, { name: INDEX_NAME.ORDER_USER_INDEX })

  // Order Details: tìm details theo order
  await db
    .collection(COLLECTIONS.ORDER_DETAILS)
    .createIndex({ order: 1 }, { name: INDEX_NAME.ORDER_DETAIL_ORDER_INDEX })
}

/**
 * Drop created indexes
 * @param db {import('mongodb').Db}
 */
async function dropIndexes(db) {
  await db.collection(COLLECTIONS.USERS).dropIndex(INDEX_NAME.USER_EMAIL_INDEX)
  await db.collection(COLLECTIONS.ROLES).dropIndex(INDEX_NAME.ROLE_NAME_INDEX)
  await db
    .collection(COLLECTIONS.PRODUCTS)
    .dropIndex(INDEX_NAME.PRODUCT_NAME_INDEX)
  await db
    .collection(COLLECTIONS.CATEGORIES)
    .dropIndex(INDEX_NAME.CATEGORY_NAME_INDEX)
  await db.collection(COLLECTIONS.ORDERS).dropIndex(INDEX_NAME.ORDER_USER_INDEX)
  await db
    .collection(COLLECTIONS.ORDER_DETAILS)
    .dropIndex(INDEX_NAME.ORDER_DETAIL_ORDER_INDEX)
}

// --- SEEDING FUNCTIONS ---

/**
 * Seed roles into database
 * @param db {import('mongodb').Db}
 */
async function seedRoles(db) {
  const roles = Object.values(ROLE_NAME).map((name) => ({
    name,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

  await db.collection(COLLECTIONS.ROLES).insertMany(roles)
}

/**
 * Seed users into database
 * @param db {import('mongodb').Db}
 */
async function seedUsers(db) {
  const adminRole = await db
    .collection(COLLECTIONS.ROLES)
    .findOne({ name: ROLE_NAME.ADMIN })

  const userRole = await db
    .collection(COLLECTIONS.ROLES)
    .findOne({ name: ROLE_NAME.USER })

  const staffRole = await db
    .collection(COLLECTIONS.ROLES)
    .findOne({ name: ROLE_NAME.STAFF })

  const users = [
    {
      email: 'admin@example.com',
      passwordHash: await hashPassword('12345aA@'),
      fullName: 'Administrator',
      phoneNumber: '',
      isActive: true,
      role: adminRole._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'user@example.com',
      passwordHash: await hashPassword('12345aA@'),
      fullName: 'User',
      phoneNumber: '',
      isActive: true,
      role: userRole._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'staff@example.com',
      passwordHash: await hashPassword('12345aA@'),
      fullName: 'Staff',
      phoneNumber: '',
      isActive: true,
      role: staffRole._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  await db.collection(COLLECTIONS.USERS).insertMany(users)
}

/**
 * Seed categories into database
 * @param db {import('mongodb').Db}
 */
async function seedCategories(db) {
  const categories = [
    {
      name: 'Cà phê',
      description: 'Các loại cà phê truyền thống và hiện đại',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Trà',
      description: 'Các loại trà thơm ngon, thanh mát',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Đá xay',
      description: 'Thức uống đá xay mát lạnh',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sinh tố',
      description: 'Sinh tố trái cây tươi ngon',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Nước ép',
      description: 'Nước ép trái cây tươi nguyên chất',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  await db.collection(COLLECTIONS.CATEGORIES).insertMany(categories)
}

/**
 * Seed products into database
 * @param db {import('mongodb').Db}
 */
async function seedProducts(db) {
  const categories = await db
    .collection(COLLECTIONS.CATEGORIES)
    .find()
    .toArray()

  const getCategoryId = (name) => categories.find((c) => c.name === name)._id

  const products = [
    // Cà phê (6 sản phẩm)
    {
      name: 'Cà phê đen đá',
      description: 'Cà phê đen pha phin truyền thống, đậm đà',
      price: 25000,
      isActive: true,
      category: getCategoryId('Cà phê'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cà phê sữa đá',
      description: 'Cà phê phin kết hợp sữa đặc thơm béo',
      price: 29000,
      isActive: true,
      category: getCategoryId('Cà phê'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Bạc xỉu',
      description: 'Cà phê với nhiều sữa, vị nhẹ nhàng',
      price: 29000,
      isActive: true,
      category: getCategoryId('Cà phê'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cappuccino',
      description: 'Espresso với sữa tươi đánh bông mịn',
      price: 45000,
      isActive: true,
      category: getCategoryId('Cà phê'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Latte',
      description: 'Espresso kết hợp sữa tươi nóng',
      price: 45000,
      isActive: true,
      category: getCategoryId('Cà phê'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Americano',
      description: 'Espresso pha loãng với nước nóng',
      price: 39000,
      isActive: true,
      category: getCategoryId('Cà phê'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Trà (5 sản phẩm)
    {
      name: 'Trà đào cam sả',
      description: 'Trà đào thơm ngon với cam và sả',
      price: 45000,
      isActive: true,
      category: getCategoryId('Trà'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Trà vải',
      description: 'Trà xanh kết hợp vải tươi ngọt mát',
      price: 45000,
      isActive: true,
      category: getCategoryId('Trà'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Trà sen vàng',
      description: 'Trà ướp sen thơm, vị thanh nhẹ',
      price: 39000,
      isActive: true,
      category: getCategoryId('Trà'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Trà sữa trân châu',
      description: 'Trà sữa thơm béo với trân châu đen dẻo',
      price: 35000,
      isActive: true,
      category: getCategoryId('Trà'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Hồng trà chanh mật ong',
      description: 'Hồng trà kết hợp chanh tươi và mật ong',
      price: 39000,
      isActive: true,
      category: getCategoryId('Trà'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Đá xay (3 sản phẩm)
    {
      name: 'Chocolate đá xay',
      description: 'Chocolate đá xay mát lạnh, béo ngậy',
      price: 49000,
      isActive: true,
      category: getCategoryId('Đá xay'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cookies đá xay',
      description: 'Đá xay vị cookies thơm ngon',
      price: 49000,
      isActive: true,
      category: getCategoryId('Đá xay'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Matcha đá xay',
      description: 'Đá xay matcha Nhật Bản thanh mát',
      price: 49000,
      isActive: true,
      category: getCategoryId('Đá xay'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Sinh tố (3 sản phẩm)
    {
      name: 'Sinh tố bơ',
      description: 'Sinh tố bơ sáp béo ngậy, bổ dưỡng',
      price: 39000,
      isActive: true,
      category: getCategoryId('Sinh tố'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sinh tố xoài',
      description: 'Sinh tố xoài chín ngọt thơm',
      price: 35000,
      isActive: true,
      category: getCategoryId('Sinh tố'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sinh tố dâu',
      description: 'Sinh tố dâu tây tươi mát',
      price: 39000,
      isActive: true,
      category: getCategoryId('Sinh tố'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Nước ép (3 sản phẩm)
    {
      name: 'Nước ép cam',
      description: 'Nước ép cam tươi nguyên chất',
      price: 35000,
      isActive: true,
      category: getCategoryId('Nước ép'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Nước ép dưa hấu',
      description: 'Nước ép dưa hấu mát lạnh',
      price: 29000,
      isActive: true,
      category: getCategoryId('Nước ép'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Nước ép ổi',
      description: 'Nước ép ổi hồng tươi ngon',
      price: 29000,
      isActive: true,
      category: getCategoryId('Nước ép'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  await db.collection(COLLECTIONS.PRODUCTS).insertMany(products)
}

// --- REMOVE SEEDING FUNCTIONS ---

/**
 * Remove seeded users
 * @param db {import('mongodb').Db}
 */
async function removeUsers(db) {
  await db.collection(COLLECTIONS.USERS).deleteMany({
    email: {
      $in: ['admin@example.com', 'user@example.com', 'staff@example.com'],
    },
  })
}

/**
 * Remove seeded roles
 * @param db {import('mongodb').Db}
 */
async function removeRoles(db) {
  await db
    .collection(COLLECTIONS.ROLES)
    .deleteMany({ name: { $in: Object.values(ROLE_NAME) } })
}

/**
 * Remove seeded products
 * @param db {import('mongodb').Db}
 */
async function removeProducts(db) {
  const productNames = [
    'Cà phê đen đá',
    'Cà phê sữa đá',
    'Bạc xỉu',
    'Cappuccino',
    'Latte',
    'Americano',
    'Trà đào cam sả',
    'Trà vải',
    'Trà sen vàng',
    'Trà sữa trân châu',
    'Hồng trà chanh mật ong',
    'Chocolate đá xay',
    'Cookies đá xay',
    'Matcha đá xay',
    'Sinh tố bơ',
    'Sinh tố xoài',
    'Sinh tố dâu',
    'Nước ép cam',
    'Nước ép dưa hấu',
    'Nước ép ổi',
  ]

  await db.collection(COLLECTIONS.PRODUCTS).deleteMany({
    name: { $in: productNames },
  })
}

/**
 * Remove seeded categories
 * @param db {import('mongodb').Db}
 */
async function removeCategories(db) {
  const categoryNames = ['Cà phê', 'Trà', 'Đá xay', 'Sinh tố', 'Nước ép']

  await db.collection(COLLECTIONS.CATEGORIES).deleteMany({
    name: { $in: categoryNames },
  })
}

module.exports = {
  /**
   * Seed initial data into database and create indexes
   * @param db {import('mongodb').Db}
   */
  async up(db) {
    await seedRoles(db)
    await seedUsers(db)
    await seedCategories(db)
    await seedProducts(db)
    await createIndexes(db)
  },

  /**
   * Remove seeded data from database and drop indexes
   * @param db {import('mongodb').Db}
   */
  async down(db) {
    await removeProducts(db)
    await removeCategories(db)
    await removeUsers(db)
    await removeRoles(db)
    await dropIndexes(db)
  },
}
