import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-xl cursor-pointer transition hover:scale-[1.01]">
      <Card className="border rounded-2xl shadow-md transition hover:shadow-lg max-w-md mx-auto">
  <CardContent className="p-4 space-y-4">
    <Avatar className="border mx-auto flex justify-center items-center w-16 h-16 rounded-full shadow">
      <AvatarImage src={project?.business?.profile?.logo} />
    </Avatar>
    <p className="text-sm text-gray-500 font-semibold">
      {project?.business?.companyName}
    </p>

    <div>
      <h2 className="text-xl font-bold text-[#7209b7]">
        {project?.title}
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        {project?.description}
      </p>
    </div>

    <div className="flex flex-wrap gap-4 text-sm text-gray-700">
      <div>
        <span className="font-semibold">Duration:</span> {project?.duration}
      </div>
      <div>
        <span className="font-semibold">Budget:</span> ₹{project?.budget}
      </div>
    </div>

    <div>
      <span className="font-semibold text-sm">Tech Stack:</span>
      <div className="flex flex-wrap gap-2 mt-1">
        {project?.specificTechStack && project.specificTechStack.map((tech, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="px-2 py-1 text-xs"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>

    <div className='flex items-center gap-4 mt-4'>
      <Button onClick={() => navigate(`/description/${project?._id}`)} variant="outline">
        Details
      </Button>
    </div>
  </CardContent>
</Card>

    </div>
  );
};

export default ProjectCard;
