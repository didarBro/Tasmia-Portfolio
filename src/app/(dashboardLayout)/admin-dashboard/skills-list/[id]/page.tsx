"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetSingleSkillsQuery,
  useUpdateSkillsByIdMutation,
} from "../../../../../redux/features/skills/skillsApi";

const UpdateSkills = () => {
  const SkillsId = useParams();
  const { data: SkillsData } = useGetSingleSkillsQuery(SkillsId?.id);
  const Skills = SkillsData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FieldValues>();

  const [updateSkillsById] = useUpdateSkillsByIdMutation();
  const router = useRouter();

  // Image upload function
  const uploadImageToImgBB = async (file: File) => {
    const url = `https://api.imgbb.com/1/upload?key=${"9b72c2e7f55726fd9a28bfb8bfedc08b"}`;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Set default values when Skills data is loaded
  useEffect(() => {
    if (Skills) {
      setValue("SkillsName", Skills.name);
      setValue("level", Skills.level);
      setValue("img", Skills.img);
    }
  }, [Skills, setValue]);

  // onSubmit function for updating Skills
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating...");

    try {
      // Handle image upload only if a new image is provided
      let imgUrl = Skills?.image; // Default to existing image if no new image is uploaded
      if (data.img && data.img.length > 0) {
        const imgFile = data.img[0] as File;
        imgUrl = await uploadImageToImgBB(imgFile);
        if (!imgUrl) {
          throw new Error("Image upload failed");
        }
      }

      const SkillsInfo = {
        name: data.SkillsName, // Defaults to existing name since we set it in useEffect
        description: data.description, // Defaults to existing description
        level: Number(data.level), // Defaults to existing price
      };

      // Update Skills by ID
      const res = await updateSkillsById({
        id: SkillsId?.id,
        data: SkillsInfo,
      }).unwrap();

      if (res) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        router.push("/admin-dashboard/skills-list");
      }
    } catch (err) {
      const serverMsgErr = (err as Error)?.message || "Something went wrong";
      toast.error(serverMsgErr, { id: toastId, duration: 3000 });
    }
  };

  // Validation for minimum 1 image upload
  const validateFiles = (files: FileList): Promise<string | true> => {
    return new Promise((resolve) => {
      if (files.length > 1) {
        resolve("Only one image can be uploaded");
      }
      resolve(true);
    });
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Update Skills
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Skills Name */}
        <div className="mb-5">
          <label
            htmlFor="Skills-name"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Skills Name
          </label>
          <input
            type="text"
            {...register("SkillsName", {
              required: "Skills Name is required",
            })}
            id="Skills-name"
            placeholder="Skills Name"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.SkillsName && (
            <p className="text-red-500">
              {errors.SkillsName.message as string}
            </p>
          )}
        </div>

        {/* level */}
        <div className="mb-5">
          <label
            htmlFor="level"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            level
          </label>
          <input
            type="number"
            {...register("level", {
              required: "level is required",
              min: { value: 0, message: "level must be at least 0" },
            })}
            id="level"
            placeholder="Enter level"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.level && (
            <p className="text-red-500">{errors.level.message as string}</p>
          )}
        </div>

        {/* Skills Image */}
        <div className="mb-5">
          <label
            htmlFor="Skills-image"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Skills Image (optional)
          </label>
          <input
            type="file"
            {...register("img", { validate: validateFiles })}
            id="Skills-image"
            accept="image/*"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          <small className="text-gray-500">Upload a new image (optional)</small>
          {errors.img && (
            <p className="text-red-500">{errors.img.message as string}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none"
        >
          Update Skills
        </button>
      </form>
    </div>
  );
};

export default UpdateSkills;
