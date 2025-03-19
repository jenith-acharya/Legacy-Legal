const express = require('express');
const { loginCheck } = require('../../middlewares/auth.middleware');
const { hasPermission } = require('../../middlewares/rbac.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middlware'); // ✅ Fixed Typo
const { practiceCreateDTO, practiceUpdateDTO } = require('./practice.request');
const practiceController = require('./practice.controller'); // ✅ Ensure this is correctly imported

const router = express.Router();

// Public routes
router.get('/list-home', practiceController.listForHome);  // ✅ Ensure function exists
router.get('/count', practiceController.countPractices);  
router.get('/:id',practiceController.viewPractice ) // ✅ Ensure function exists

// Protected routes for Admin
router.route('/')
    .get(loginCheck, hasPermission(['admin']), practiceController.listForTable)
    .post(
        loginCheck,
        hasPermission(['admin']),
        setPath('practices'),
        uploadFile().single('image'),
        bodyValidator(practiceCreateDTO),
        practiceController.createPractice
    );

router.route('/:id')
    .get(practiceController.viewPractice)
    .patch(
        loginCheck,
        hasPermission(['admin']),
        setPath('practices'),
        uploadFile().single('image'),
        bodyValidator(practiceUpdateDTO),
        practiceController.editPractice
    )
    .delete(
        loginCheck,
        hasPermission(['admin']),
        practiceController.deletePractice
    );

module.exports = router;
