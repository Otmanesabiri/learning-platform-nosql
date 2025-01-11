const { ObjectId } = require('mongodb');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    const course = await mongoService.insertOne('courses', req.body);
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    
    // Try to get from cache first
    const cachedCourse = await redisService.getCachedData(`course:${courseId}`);
    if (cachedCourse) {
      return res.json(cachedCourse);
    }

    // If not in cache, get from DB
    const course = await mongoService.findOneById('courses', courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Cache the result
    await redisService.cacheData(`course:${courseId}`, course);
    res.json(course);
  } catch (error) {
    console.error('Error getting course:', error);
    res.status(500).json({ error: 'Failed to get course' });
  }
}

async function getCourseStats(req, res) {
  try {
    const stats = await mongoService.getDb()
      .collection('courses')
      .aggregate([
        {
          $group: {
            _id: null,
            totalCourses: { $sum: 1 },
            averageStudents: { $avg: '$studentCount' }
          }
        }
      ]).toArray();
    
    res.json(stats[0] || { totalCourses: 0, averageStudents: 0 });
  } catch (error) {
    console.error('Error getting course stats:', error);
    res.status(500).json({ error: 'Failed to get course stats' });
  }
}
module.exports = {
  createCourse,
  getCourse,
  getCourseStats
};