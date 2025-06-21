import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 my-10">
        <h1 className="text-5xl font-bold">
          From Classrooms to Codebases
          <br /> Build, Collaborate &{" "}
          <span className="text-[#6A38C2]">Grow</span>
        </h1>
        <p>
          Real projects. Real experience. ClassToCode helps students grow and
          businesses thrive — together.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
