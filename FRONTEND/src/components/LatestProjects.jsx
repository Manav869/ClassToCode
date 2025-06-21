import React from "react";
import LatestProjectCards from "./LatestProjectCards";
import { useSelector } from "react-redux";

const LatestProjects = () => {
  const{allProjects} = useSelector(store=>store.project);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="test-4xl font-bold">
        <span className="text-[#6A38C2]">New</span>  Projects
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allProjects.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allProjects?.slice(0, 3).map((project) => <LatestProjectCards  key = {project._id} project={project}/>)
        )}
      </div>
    </div>
  );
};

export default LatestProjects;
