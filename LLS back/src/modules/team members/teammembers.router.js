const express = require('express');
const { loginCheck } = require('../../middlewares/auth.middleware');
const { hasPermission } = require('../../middlewares/rbac.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middlware'); 
const { teamMemberCreateDTO, teamMemberUpdateDTO } = require('./team.request');
const memberController = require('./teammember.controller'); 

const router = express.Router();

// Public routes
router.get('/list-home', memberController.getMembers); 
router.get('/:id', memberController.getMemberById)// ✅ Renamed for consistency

// Protected routes for Admin
router.route('/')
    .get(loginCheck, hasPermission(['admin']), memberController.getMembers) // ✅ Renamed method
    .post(
        loginCheck,
        hasPermission(['admin']),
        setPath('teammembers'),
        uploadFile().single('image'),
        bodyValidator(teamMemberCreateDTO),
        memberController.createMember
    );

router.route('/:member')
    .get(memberController.getMemberById) // ✅ Fixed method name
    .patch(
        loginCheck,
        hasPermission(['admin']),
        setPath('teammembers'),
        uploadFile().single('image'),
        bodyValidator(teamMemberUpdateDTO),
        memberController.updateMember // ✅ Fixed method name
    )
    .delete(
        loginCheck,
        hasPermission(['admin']),
        memberController.deleteMember
    );

module.exports = router;
