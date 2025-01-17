<<<<<<< HEAD
// src/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes pour les étudiants
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudent);
router.get('/:id/courses', studentController.getStudentCourses);

=======
// src/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes pour les étudiants
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudent);
router.get('/:id/courses', studentController.getStudentCourses);

>>>>>>> a5a3ad47d612c4f774115e2b60b95b3c2c3d28da
module.exports = router;