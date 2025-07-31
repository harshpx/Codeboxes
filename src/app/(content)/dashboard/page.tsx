import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <div className="grow flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-2 border-white">
        Code List
      </div>
    </div>
  );
};

export default Dashboard;
