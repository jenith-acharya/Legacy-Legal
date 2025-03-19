import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  
} from "@fortawesome/free-solid-svg-icons";
import kumar from "../../assets/public/dr kumar.jpg";
import radha from "../../assets/public/radha.jpg";
import prerana from "../../assets/public/prerana.jpg";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Breadcrumbnavigation from "../../components/common/breadcrumb navigation/breadcrumb component";
import { NavLink } from "react-router-dom";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Kumar Sharma Acharya",
      role: "Senior Partner",
      expertise: "Expert in Arbitration & International Law",
      imageUrl: kumar, // Replace with actual image URL
      email: "kumar@yourlawfirm.com",
      social: {
        facebook: "https://facebook.com/kumar",
        twitter: "https://twitter.com/kumar",
        linkedin: "https://linkedin.com/in/kumar",
      },
    },
    {
      name: "Radha Sharma Acharya",
      role: "Senior Partner",
      expertise: "Specialist in Family & Property Law",
      imageUrl: radha, // Replace with actual image URL
      email: "radha@yourlawfirm.com",
      social: {
        facebook: "https://facebook.com/radha",
        twitter: "https://twitter.com/radha",
        linkedin: "https://linkedin.com/in/radha",
      },
    },
    {
      name: "Prerana Basnet Acharya",
      role: "Partner & Head of Corporate",
      expertise: "Strategist in Business & Compliance",
      imageUrl: prerana, // Replace with actual image URL
      email: "prerana@yourlawfirm.com",
      social: {
        facebook: "https://facebook.com/prerana",
        twitter: "https://twitter.com/prerana",
        linkedin: "https://linkedin.com/in/prerana",
      },
    },
  ];

  return (
    <>
      <Breadcrumbnavigation>Our Team</Breadcrumbnavigation>
      <section className="py-12 bg-red-800"> {/* Red background for the section */}
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-white">
            Meet Our Legal Experts
          </h1>
          <p className="text-center text-gray-300 mt-2">
            Experienced professionals dedicated to your success.
          </p>
          <NavLink to="/ourteam/">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white text-red-800 shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-xl" // White background for boxes and red text
              >
                {/* Adjusting the image size to be more vertically long */}
                <img 
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-72 object-cover rounded-md" // Adjusted height for vertically longer image
                />
                <h2 className="text-xl font-semibold mt-4">{member.name}</h2>
                <p className="text-gray-800">{member.role}</p>
                <p className="text-sm text-gray-600 mt-2">{member.expertise}</p>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-4 mt-4">
                  <a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-800 hover:text-gray-700 transition text-2xl"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-800 hover:text-gray-700 transition text-2xl"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-800 hover:text-gray-700 transition text-2xl"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-red-800 hover:text-gray-700 transition text-2xl"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default TeamSection;



