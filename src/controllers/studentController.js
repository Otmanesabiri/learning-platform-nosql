<<<<<<< HEAD
// src/controllers/studentController.js
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createStudent(req, res) {
  try {
    const student = await mongoService.insertOne('students', req.body);
    res.status(201).json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
}

async function getStudent(req, res) {
  try {
    const studentId = req.params.id;
    
    // Try cache first
    const cachedStudent = await redisService.getCachedData(`student:${studentId}`);
    if (cachedStudent) {
      return res.json(cachedStudent);
    }

    // If not in cache, get from DB
    const student = await mongoService.findOneById('students', studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Cache the result
    await redisService.cacheData(`student:${studentId}`, student);
    res.json(student);
  } catch (error) {
    console.error('Error getting student:', error);
    res.status(500).json({ error: 'Failed to get student' });
  }
}

async function getStudentCourses(req, res) {
  try {
    const studentId = req.params.id;
    const courses = await mongoService.findWithPagination(
      'enrollments',
      { studentId },
      req.query.page,
      req.query.limit
    );
    res.json(courses);
  } catch (error) {
    console.error('Error getting student courses:', error);
    res.status(500).json({ error: 'Failed to get student courses' });
  }
}

module.exports = {
  createStudent,
  getStudent,
  getStudentCourses
=======
// src/controllers/studentController.js
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createStudent(req, res) {
  try {
    const student = await mongoService.insertOne('students', req.body);
    res.status(201).json(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
}

async function getStudent(req, res) {
  try {
    const studentId = req.params.id;
    
    // Try cache first
    const cachedStudent = await redisService.getCachedData(`student:${studentId}`);
    if (cachedStudent) {
      return res.json(cachedStudent);
    }

    // If not in cache, get from DB
    const student = await mongoService.findOneById('students', studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Cache the result
    await redisService.cacheData(`student:${studentId}`, student);
    res.json(student);
  } catch (error) {
    console.error('Error getting student:', error);
    res.status(500).json({ error: 'Failed to get student' });
  }
}

async function getStudentCourses(req, res) {
  try {
    const studentId = req.params.id;
    const courses = await mongoService.findWithPagination(
      'enrollments',
      { studentId },
      req.query.page,
      req.query.limit
    );
    res.json(courses);
  } catch (error) {
    console.error('Error getting student courses:', error);
    res.status(500).json({ error: 'Failed to get student courses' });
  }
}

module.exports = {
  createStudent,
  getStudent,
  getStudentCourses
>>>>>>> a5a3ad47d612c4f774115e2b60b95b3c2c3d28da
};