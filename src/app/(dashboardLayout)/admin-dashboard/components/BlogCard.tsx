import { useDeleteblogByIdMutation } from "@/redux/features/blog/blogApi";
import { TError } from "@/types/gobal";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export interface BlogCardProps {
  _id?: string;
  title: string;
  description: string;
  date: string;
  author: string;
  img: string;
}

const BlogCard = ({
  _id,
  title,
  description,
  date,
  author,
  img,
}: BlogCardProps) => {
  const [deleteBlog] = useDeleteblogByIdMutation();

  // delete
  const handleBlogDelete = async (id: string, name: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the Blog "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting the Blog...");

        try {
          const res = await deleteBlog(id).unwrap();

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
            "An error occurred while deleting the Blog. Please try again.";

          toast.error(serverMsgErr, {
            id: toastId,
            duration: 3000,
          });
        }
      }
    });
  };

  return (
    <div className="bg-slate-300 p-6 rounded-lg shadow-lg">
      <Image
        className="w-full h-64 object-cover rounded-lg mb-6"
        height={100}
        width={100}
        src={img}
        alt={title}
      />
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description?.slice(0, 100)}</p>
      <div className="flex items-center text-sm text-gray-500">
        <span>{date}</span>
        <span className="mx-2">|</span>
        <span>{author}</span>
      </div>
      <a href="#" className="text-blue-500 mt-4 inline-block mr-10">
        Read more
      </a>

      <Link href={`/admin-dashboard/blog-list/${_id}`}>
        <button className="btn btn-sm px-3 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-indigo-500">
          Update
        </button>
      </Link>
      <button
        onClick={() => handleBlogDelete(_id as string, title as string)}
        className="btn btn-sm ml-2 px-3 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md hover:bg-gradient-to-l hover:from-red-700 hover:to-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default BlogCard;
