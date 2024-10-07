
import { Button } from "@/components/ui/button";
import { LibraryBig, Database, ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: Database,
      path: "/dashboard/responses",
    },
    {
      id: 3, // Changed id to 3 to make it unique
      name: "Analytics",
      icon: ChartNoAxesCombined,
      path: "/dashboard/analytics",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {menuList.map((menu) => (
          <Link href={menu.path}
            key={menu.id}
            className={`flex items-center gap-3 p-4 mb-3 font-medium rounded-lg cursor-pointer ${
              path === menu.path ? 'bg-primary text-white' : 'text-gray-600 hover:bg-primary hover:text-white'
            }`}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>

      <div className="fixed bottom-20 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>
        {/* <div className="my-5">
            <Progress value={33}/>
        </div> */}
      </div>
    </div>
  );
};

export default SideNav;
