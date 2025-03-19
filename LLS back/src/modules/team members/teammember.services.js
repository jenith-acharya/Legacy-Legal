const bcrypt = require("bcryptjs");
const mailService = require("../../../services/mail.service");
const { randomStringGenerator, deleteFile } = require("../../../utilis/helper");
const TeamModel = require("./team.model");
const { uploadImage } = require("../../config/cloudinary.config");

class TeamService {
  
  // Generate activation token for team members
  generateMemberActivationToken = (data) => {
    const token = randomStringGenerator(20);
    return { ...data, activationToken: token };
  };

  // Transform team member creation data
  transformMemberCreate = async (req) => {
    try {
        let data = req.body;

        if (!data.password) {
            throw { statusCode: 422, message: 'Password is required' };
        }

        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
        delete data.confirmPassword;

        data = this.generateMemberActivationToken(data);
        data.status = "inactive";

        return data;
    } catch (error) {
        console.error("Error at transform member creation service", error);
        throw error;
    }
};

  // Send activation email to team member
  sendActivationEmail = async ({
    name,
    email,
    activationToken,
    sub = "Team Member Activation Token",
  }) => {
    try {
      await mailService.sendMail({
        to: email,
        sub: sub,
        message: `
          Dear ${name},<br>
          Your team member account has been created successfully. Please activate your account using the link below:<br>
          <a href="${process.env.FRONTEND_URL}/activate/${activationToken}">Activate Now</a>
          <p><small>This is an automated email. Please do not reply.</small></p>
          <p>Regards,<br>Team</p>
        `,
      });
    } catch (error) {
      console.error("Error sending activation email", error);
    }
  };

  // Create a new team member
  createMember = async (data) => {
    try {
      const member = new TeamModel(data);
      return await member.save();
    } catch (error) {
      console.error("Error creating team member", error);

      // Delete image if error occurs
      if (data.image) {
        deleteFile(`./public/uploads/${data.image}`);
      }

      throw error;
    }
  };

  // Get a single team member by filter
  getSingleMemberByFilter = async (filter) => {
    try {
        const memberDetail = await TeamModel.findOne(filter);
        if (!memberDetail) {
            throw { statusCode: 422, message: "Member not found" };
        }
        return memberDetail;
    } catch (error) {
        throw error;
    }
};


  // Get a single team member by ID
  getSingleMemberById = async (id) => {
    try {
      const memberDetail = await TeamModel.findById(id);
      if (memberDetail) {
        return memberDetail;
      } else {
        throw { statusCode: 422, message: "Unable to process request" };
      }
    } catch (error) {
      throw error;
    }
  };

  // Get all team members with pagination and search
  getAllMembers = async (page = 1, limit = 5, search = {}) => {
    try {
      const skip = (page - 1) * limit;
      const members = await TeamModel.find(search, "-password -activationToken -createdAt -updatedAt")
        .skip(skip)
        .limit(limit);
      return members;
    } catch (error) {
      throw error;
    }
  };

  // Count total team members
  countMembers = async (limit) => {
    try {
      const total = await TeamModel.countDocuments();
      return {
        total,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  };

  // Update a team member by ID
  updateById = async (id, data) => {
    try {
      const response = await TeamModel.findByIdAndUpdate(id, data, { new: true });
      if (!response) {
        throw { statusCode: 404, message: "Team member not found" };
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Delete a team member by ID
  deleteById = async (id) => {
    try {
      const response = await TeamModel.findByIdAndDelete(id);
      if (!response) {
        throw { statusCode: 404, message: "Team member not found" };
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
}

// Create an instance of TeamService
const teamService = new TeamService();

module.exports = teamService;
