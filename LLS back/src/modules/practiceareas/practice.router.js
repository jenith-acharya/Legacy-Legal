const express = require('express');
const { loginCheck } = require('../../middlewares/auth.middleware');
const { hasPermission } = require('../../middlewares/rbac.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middlware'); 
const { PracticeAreaCreateDTO, PracticeAreaUpdateDTO } = require('./practice.request');
const practiceController = require('./practice.controller'); 

const router = express.Router();

// Public routes
router.get('/list-home', practiceController.listPractices);  
router.get('/:id',practiceController.viewPractice )

// Protected routes for Admin
router.route('/')
    .get(loginCheck, hasPermission(['admin']), practiceController.listPractices)
    .post(
        loginCheck,
        hasPermission(['admin']),
        setPath('practices'),
        uploadFile().single('image'),
        bodyValidator(PracticeAreaCreateDTO),
        practiceController.createPractice
    );

router.route('/:id')
    .get(practiceController.viewPractice)
    .patch(
        loginCheck,
        hasPermission(['admin']),
        setPath('practices'),
        uploadFile().single('image'),
        bodyValidator(PracticeAreaUpdateDTO),
        practiceController.editPractice
    )
    .delete(
        loginCheck,
        hasPermission(['admin']),
        practiceController.deletePractice
    );

module.exports = router;
