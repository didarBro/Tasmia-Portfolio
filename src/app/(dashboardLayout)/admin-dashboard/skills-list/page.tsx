/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TSkills } from "@/app/components/TechnicalSkills";
import {
  useGetSkillsQuery,
  useDeleteSkillsByIdMutation,
} from "@/redux/features/skills/skillsApi";
import { TError } from "@/types/gobal";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Swal from "sweetalert2";

const SkillsList = () => {
  const { data } = useGetSkillsQuery({});
  const [deleteSkills] = useDeleteSkillsByIdMutation();

  const SkillsData = data?.data?.result || [];

  // delete
  const handleSkillsDelete = async (id: string, name: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the Skills "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting the Skills...");

        try {
          const res = await deleteSkills(id).unwrap();

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
            "An error occurred while deleting the Skills. Please try again.";

          toast.error(serverMsgErr, {
            id: toastId,
            duration: 3000,
          });
        }
      }
    });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Image
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>

          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Level
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {SkillsData?.map((Skills: TSkills) => (
          <tr key={Skills?._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <Image
                className="rounded"
                src={Skills?.img}
                alt={Skills?.name}
                height={30}
                width={30}
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {Skills?.name}
              </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{Skills?.level}%</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Link href={`/admin-dashboard/skills-list/${Skills?._id}`}>
                <button className="btn btn-sm px-3 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-indigo-500">
                  Update
                </button>
              </Link>
              <button
                onClick={() =>
                  handleSkillsDelete(
                    Skills._id as string,
                    Skills.name as string
                  )
                }
                className="btn btn-sm ml-2 px-3 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md hover:bg-gradient-to-l hover:from-red-700 hover:to-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkillsList;
