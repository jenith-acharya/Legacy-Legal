import { Button } from "flowbite-react";
import commercialmediation from "../../assets/public/commercial mediation.jpg";
import banking from "../../assets/public/banking and finance disputes.jpg";
import coandcommlitigation from "../../assets/public/corporate and commercial litigation.jpeg";
import debt from "../../assets/public/debt recovery and insolvency matters.jpg";
import developmentproject from "../../assets/public/development project disputes.jpg";
import domesticandinternation from "../../assets/public/domestic and international arbiturites.webp";
import Heading1 from "../common/title";

const Areasofpracticecomponent = () => {
  return (
   
      <div>     <br />
      <Heading1>Areas of Practice</Heading1><br/>
      <div className="bg-gray-100 py-10"> {/* Background color applied */}
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto p-4">
        <a href="google.com" className="block">
          {/* Card 1 */}
          <div className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
            <img src={banking} alt="Card 2" className="w-full h-auto" />
            <div className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-bold">Banking and Financial Disputes</p>
            </div>
          </div>
        </a>

        {/* Card 2 */}
        <div className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
          <img src={commercialmediation} alt="Card 2" className="w-full h-auto" />
          <div className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold">Commercial Litigation</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
          <img src={coandcommlitigation} alt="Card 3" className="w-full h-auto" />
          <div className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold">Corporation and Commercial Litigation</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
          <img src={debt} alt="Card 3" className="w-full h-auto" />
          <div className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold">Debt</p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
          <img src={developmentproject} alt="Card 3" className="w-full h-auto" />
          <div className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold">Development Project Disputes</p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="relative group rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
          <img src={domesticandinternation} alt="Card 2" className="w-full h-auto" />
          <div className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold">Domestic and International Mediation</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button
          href="/areasofpractice"
          style={{ width: 200, height: 45 }}
          className="bg-red-800 size-3/12 hover:bg-red-600 transition-transform duration-300 hover:scale-105"
        >
          LEARN MORE
        </Button>
        </div>
    </div>
    </div>
 
  );
};

export default Areasofpracticecomponent;
