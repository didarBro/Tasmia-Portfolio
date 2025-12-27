"use client";
import { useCreateSkillsMutation } from "@/redux/features/skills/skillsApi";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateSkills = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createSkills] = useCreateSkillsMutation();

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

  // onSubmit function
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    try {
      // Upload the single image
      const imgFile = data.img[0] as File; // Get the first file only
      const imgUrl = await uploadImageToImgBB(imgFile);
      if (!imgUrl) {
        throw new Error("Image upload failed");
      }

      const SkillsInfo = {
        name: data.name,
        level: Number(data.level),
        img: imgUrl,
      };

      console.log(SkillsInfo);

      // send to data to databse
      const res = await createSkills(SkillsInfo).unwrap();

      if (res) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        router.push("/admin-dashboard/skills-list");
      }

      console.log(res);
    } catch (err) {
      const serverMsgErr = (err as Error)?.message || "Something went wrong";

      toast.error(serverMsgErr, { id: toastId, duration: 3000 });
    }
  };

  // Validation for minimum 1 image upload
  const validateFiles = (files: FileList): Promise<string | true> => {
    return new Promise((resolve) => {
      if (files.length < 1) {
        resolve("At least 1 image is required");
      }
      resolve(true);
    });
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Create a Skills
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
            {...register("name", {
              required: "Skills Name is required",
            })}
            id="name"
            placeholder="Skills Name"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message as string}</p>
          )}
        </div>

        {/* level */}
        <div className="mb-5">
          <label
            htmlFor="level"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Level
          </label>
          <input
            type="number"
            {...register("level", {
              required: "level is required",
              min: { value: 0, message: "Level must be at least 0" },
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
            Skills Image
          </label>
          <input
            type="file"
            {...register("img", {
              required: "An image is required",
              validate: validateFiles,
            })}
            id="Skills-image"
            accept="image/*"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          <small className="text-gray-500">Upload an image</small>
          {errors.img && (
            <p className="text-red-500">{errors.img.message as string}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
        >
          Create Skills
        </button>
      </form>
    </div>
  );
};

export default CreateSkills;
