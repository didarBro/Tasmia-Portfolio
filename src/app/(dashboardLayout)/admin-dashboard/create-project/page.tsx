"use client";
import { useCreateprojectMutation } from "@/redux/features/project/projectApi";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

const CreateProject = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createProject] = useCreateprojectMutation();
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");

  // Handle adding a technology
  const handleAddTechnology = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim() !== "") {
      e.preventDefault();
      if (!technologies.includes(techInput.trim())) {
        setTechnologies((prev) => [...prev, techInput.trim()]);
      }
      setTechInput("");
    }
  };

  // Handle removing a technology
  const handleRemoveTechnology = (tech: string) => {
    setTechnologies((prev) => prev.filter((t) => t !== tech));
  };

  // onSubmit function
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    try {
      const ProjectInfo = {
        title: data.title,
        description: data.description,
        technologies, // Using the state array
        clientCode: data.clientCode,
        serverCode: data.serverCode,
        liveLink: data.liveLink,
        date: data.date,
        type: data.type,
        challenges: data.challenges,
        features: data.features,
      };

      console.log(ProjectInfo);

      // Send to database
      const res = await createProject(ProjectInfo).unwrap();

      if (res) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        setTechnologies([]); // Reset technologies
        router.push("/admin-dashboard/project-list");
      }

      console.log(res);
    } catch (err) {
      const serverMsgErr = (err as Error)?.message || "Something went wrong";

      toast.error(serverMsgErr, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Create a Project
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Project Title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Project Title
          </label>
          <input
            type="text"
            {...register("title", {
              required: "Project title is required",
            })}
            id="title"
            placeholder="Project title"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message as string}</p>
          )}
        </div>

        {/* Project Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            id="description"
            placeholder="Project description"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500">
              {errors.description.message as string}
            </p>
          )}
        </div>

        {/* Technologies */}
        <div className="mb-5">
          <label
            htmlFor="technologies"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Technologies
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="technologies"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleAddTechnology}
              placeholder="Enter a technology and press Enter"
              className="flex-1 rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-200 py-1 px-3 text-sm font-medium text-indigo-700"
              >
                {tech}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveTechnology(tech)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Client Code URL */}
        <div className="mb-5">
          <label
            htmlFor="clientCode"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Client Code URL
          </label>
          <input
            type="url"
            {...register("clientCode", {
              required: "Client code URL is required",
            })}
            id="clientCode"
            placeholder="https://github.com/your-client-repo"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.clientCode && (
            <p className="text-red-500">
              {errors.clientCode.message as string}
            </p>
          )}
        </div>

        {/* Server Code URL */}
        <div className="mb-5">
          <label
            htmlFor="serverCode"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Server Code URL
          </label>
          <input
            type="url"
            {...register("serverCode", {
              required: "Server code URL is required",
            })}
            id="serverCode"
            placeholder="https://github.com/your-server-repo"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.serverCode && (
            <p className="text-red-500">
              {errors.serverCode.message as string}
            </p>
          )}
        </div>

        {/* Live Link */}
        <div className="mb-5">
          <label
            htmlFor="liveLink"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Live Link
          </label>
          <input
            type="url"
            {...register("liveLink", {
              required: "Live link is required",
            })}
            id="liveLink"
            placeholder="https://your-live-project.com"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.liveLink && (
            <p className="text-red-500">{errors.liveLink.message as string}</p>
          )}
        </div>

        {/* Date */}
        <div className="mb-5">
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Project Date
          </label>
          <input
            type="date"
            {...register("date", {
              required: "Project date is required",
            })}
            id="date"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.date && (
            <p className="text-red-500">{errors.date.message as string}</p>
          )}
        </div>

        {/* Type */}
        <div className="mb-5">
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Type
          </label>
          <input
            type="text"
            {...register("type", {
              required: "Type is required",
            })}
            id="type"
            placeholder="Project type"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.type && (
            <p className="text-red-500">{errors.type.message as string}</p>
          )}
        </div>

        {/* Challenges */}
        <div className="mb-5">
          <label
            htmlFor="challenges"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Challenges
          </label>
          <textarea
            {...register("challenges", {
              required: "Challenges are required",
            })}
            id="challenges"
            placeholder="Describe project challenges"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            rows={4}
          />
          {errors.challenges && (
            <p className="text-red-500">
              {errors.challenges.message as string}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="mb-5">
          <label
            htmlFor="features"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Features
          </label>
          <textarea
            {...register("features", {
              required: "Features are required",
            })}
            id="features"
            placeholder="Describe project features"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            rows={4}
          />
          {errors.features && (
            <p className="text-red-500">{errors.features.message as string}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
