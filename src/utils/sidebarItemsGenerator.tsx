import { TUserPath, TSidebarItem } from "@/types/sidebar.types";
import Link from "next/link";

const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <Link href={`/${role}/${item.path}`}>{item.name}</Link>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <Link href={`/${role}/${child.path}`}>{child.name}</Link>,
        })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};

export default sidebarItemsGenerator;
