import React from "react";
import { motion } from "framer-motion";
import { TProject } from "@/types/types.project";
import Link from "next/link";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { TError } from "@/types/gobal";
import { useDeleteprojectByIdMutation } from "@/redux/features/project/projectApi";

const ProjectCard = ({ project }: { project: TProject }) => {
  const [deleteproject] = useDeleteprojectByIdMutation();

  // delete
  const handleProjectDelete = async (id: string, title: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the project "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting the project...");

        try {
          const res = await deleteproject(id).unwrap();

          if (res && res.message) {
            toast.success(res.message, { id: toastId, duration: 3000 });
          } else {
            toast.error("Unexpected response received.", {
              id: toastId,
              duration: 3000,
            });
          }
        } catch (err) {
          const serverMsgErr =
            (err as TError)?.data?.message ||
            "An error occurred while deleting the project. Please try again.";

          toast.error(serverMsgErr, {
            id: toastId,
            duration: 3000,
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row border-2 rounded-lg shadow-md overflow-hidden my-8">
      {/* Left Side: Live Preview in iframe */}
      <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="h-full w-full overflow-hidden"
          >
            <iframe
              src={project.liveLink}
              className="h-full w-full border-none"
              title={project.title}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            ></iframe>
          </motion.div>
        </a>
      </div>

      {/* Right Side: Content */}
      <div className="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-green-400 mb-3">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4">
            {project?.description?.slice(0, 100)}
          </p>

          {/* Technology Stack */}
          <h4 className="text-lg font-medium text-white mb-2">Technologies:</h4>
          <ul className="list-disc pl-5 text-gray-400 mb-4">
            {project.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <a
            href={project.clientCode}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Client Code
            </motion.button>
          </a>
          <a
            href={project.serverCode}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Server Code
            </motion.button>
          </a>
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <motion.button
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Link
            </motion.button>
          </a>
          <Link href={`/admin-dashboard/project-list/${project?._id}`}>
            <button className="px-4 py-2 bg-red-500 hover:bg-purple-700 text-white rounded-lg">
              Update Project
            </button>
          </Link>
          <button
            onClick={() =>
              handleProjectDelete(
                project._id as string,
                project.title as string
              )
            }
            className="px-4 py-2 bg-red-600 hover:bg-orange-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
