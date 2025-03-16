const express = require('express');
const { loginCheck } = require('../../middlewares/auth.middleware');
const { hasPermission } = require('../../middlewares/rbac.middleware');
const { setPath, uploadFile } = require('../../middlewares/uploader.middleware');
const { bodyValidator } = require('../../middlewares/validator.middlware'); 
const { teamMemberCreateDTO, teamMemberUpdateDTO } = require('./team.request');
const teamMemberController = require('./teammember.controller'); 

const router = express.Router();

// Public routes
router.get('/list-home', teamMemberController.getTeamMembers); // ✅ Renamed for consistency

// Protected routes for Admin
router.route('/')
    .get(loginCheck, hasPermission(['admin']), teamMemberController.getTeamMembers) // ✅ Renamed method
    .post(
        loginCheck,
        hasPermission(['admin']),
        setPath('teammembers'),
        uploadFile().single('image'),
        bodyValidator(teamMemberCreateDTO),
        teamMemberController.createTeamMember
    );

router.route('/:member')
    .get(teamMemberController.getTeamMemberById) // ✅ Fixed method name
    .patch(
        loginCheck,
        hasPermission(['admin']),
        setPath('teammembers'),
        uploadFile().single('image'),
        bodyValidator(teamMemberUpdateDTO),
        teamMemberController.updateTeamMember // ✅ Fixed method name
    )
    .delete(
        loginCheck,
        hasPermission(['admin']),
        teamMemberController.deleteTeamMember
    );

module.exports = router;
