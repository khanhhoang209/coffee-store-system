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

  await db
    .collection(COLLECTIONS.ORDERS)
    .createIndex({ user: 1 }, { name: INDEX_NAME.ORDER_USER_INDEX })

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

module.exports = {
  /**
   * Create indexes
   * @param db {import('mongodb').Db}
   */
  async up(db) {
    await createIndexes(db)
  },

  /**
   * Drop indexes
   * @param db {import('mongodb').Db}
   */
  async down(db) {
    await dropIndexes(db)
  },
}
