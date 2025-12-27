"use client";

import { useGetprojectQuery } from "@/redux/features/project/projectApi";
import ProjectCard from "./ProjectCard";
import { TProject } from "@/types/types.project";
import DynamicLoading from "./DynamicLoading";

const ProjectSection = () => {
  const { data, isLoading } = useGetprojectQuery({});

  const projectData = data?.data?.result || [];

  return (
    <section
      className="pt-20 px-6 md:px-8 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      id="project"
    >
      <h2 className="text-4xl text-center mb-10 font-extrabold tracking-tight text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
          My Project
        </span>
      </h2>

      {isLoading ? (
        <DynamicLoading />
      ) : (
        <div>
          {projectData.map((project: TProject) => (
            <ProjectCard key={project?._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectSection;
