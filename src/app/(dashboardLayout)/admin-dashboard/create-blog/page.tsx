"use client";
import { useCreateblogMutation } from "@/redux/features/blog/blogApi";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const CreateBlog = () => {
  const router = useRouter();
  const editorRef = useRef(null); // Ref for Jodit Editor
  const [content, setContent] = useState(""); // State for editor content

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // For setting form values programmatically
  } = useForm();

  const [createBlog] = useCreateblogMutation();

  // Function to handle image upload
  const uploadImageToImgBB = async (file: File) => {
    const url = `https://api.imgbb.com/1/upload?key=${"9b72c2e7f55726fd9a28bfb8bfedc08b"}`;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(url, { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) return data.data.url;
      throw new Error(data.error.message);
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Function to handle form submission
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    try {
      const imgFile = data.img[0];
      const imgUrl = await uploadImageToImgBB(imgFile);
      if (!imgUrl) throw new Error("Image upload failed");

      const date = new Date();
      const formattedDate = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getDate()}, ${date.getFullYear()}`;

      const BlogInfo = {
        title: data.title,
        description: content, // Use content state for description
        img: imgUrl,
        date: formattedDate,
      };

      const res = await createBlog(BlogInfo).unwrap();
      toast.success(res?.message, { id: toastId });
      reset();
      setContent(""); // Clear the editor content
      router.push("/admin-dashboard/blog-list");
    } catch (err) {
      const errorMessage =
        (err as { message: string }).message || "Something went wrong";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Create a Blog
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Blog Title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-indigo-700"
          >
            Blog Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Blog title is required" })}
            id="title"
            className="w-full border rounded-md px-4 py-3 text-black bg-gray-50 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message as string}</p>
          )}
        </div>

        {/* Blog Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-indigo-700"
          >
            Description
          </label>
          <div className="border rounded-md text-black bg-gray-50 focus-within:bg-white">
            <JoditEditor
              ref={editorRef}
              value={content}
              config={{
                readonly: false,
                tabIndex: 1,
              }}
              onBlur={(newContent) => {
                setContent(newContent); // Update state
                setValue("description", newContent); // Set form value
              }}
            />
          </div>
          {errors.description && (
            <p className="text-red-500">
              {errors.description.message as string}
            </p>
          )}
        </div>

        {/* Blog Image */}
        <div className="mb-5">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-indigo-700"
          >
            Blog Image
          </label>
          <input
            type="file"
            {...register("img", {
              required: "Image is required",
              validate: (files) =>
                files.length > 0 || "Upload at least one image",
            })}
            id="img"
            accept="image/*"
            className="w-full border rounded-md px-4 py-3 bg-gray-50 focus:bg-white"
          />
          {errors.img && (
            <p className="text-red-500">{errors.img.message as string}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
