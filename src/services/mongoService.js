const { ObjectId } = require('mongodb');
const db = require('../config/db');
async function findOneById(collection, id) {
  try {
    const mongoDb = db.getDb();
    return await mongoDb.collection(collection).findOne({ 
      _id: new ObjectId(id) 
    });
  } catch (error) {
    console.error(`Error finding document in ${collection}:`, error);
    throw error;
  }
}

async function insertOne(collection, document) {
  try {
    const mongoDb = db.getDb();
    return await mongoDb.collection(collection).insertOne(document);
  } catch (error) {
    console.error(`Error inserting document in ${collection}:`, error);
    throw error;
  }
}

async function findWithPagination(collection, query = {}, page = 1, limit = 10) {
  try {
    const mongoDb = db.getDb();
    const skip = (page - 1) * limit;
    return await mongoDb.collection(collection)
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
  } catch (error) {
    console.error(`Error finding documents in ${collection}:`, error);
    throw error;
  }
}
module.exports = {
  findOneById,
  insertOne,
  findWithPagination
};