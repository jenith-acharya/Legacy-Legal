import { Card } from "flowbite-react";
import drkumar from "../../../../../dr kumar.jpg";
import radha from "../../../../../radha.jpg";
import prerana from "../../../../../prerana.jpg";
import Heading1 from "../common/title";

const Ourteamcomponent = () => {
  return (
    <>
      <Heading1>Our Team</Heading1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center px-5">
        <Card className="max-w-sm mx-auto">
          <img
            className="rounded-t-lg h-[300px] w-full object-cover"
            src={drkumar}
            alt="Dr. Kumar Sharma Acharya"
          />
          <div className="p-5 text-center">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dr. Kumar Sharma Acharya
            </h5>
            <h6 className="text-gray-500">Senior Partner</h6>
          </div>
        </Card>

        <Card className="max-w-sm mx-auto">
          <img
            className="rounded-t-lg h-[300px] w-full object-cover"
            src={radha}
            alt="Radha Sharma Acharya"
          />
          <div className="p-5 text-center">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Radha Sharma Acharya
            </h5>
            <h6 className="text-gray-500">Senior Partner</h6>
          </div>
        </Card>

        <Card className="max-w-sm mx-auto">
          <img
            className="rounded-t-lg h-[300px] w-full object-cover"
            src={prerana}
            alt="Prerana Basnet Acharya"
          />
          <div className="p-5 text-center">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Prerana Basnet Acharya
            </h5>
            <h6 className="text-gray-500">Partner and Head of Corporate</h6>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Ourteamcomponent;