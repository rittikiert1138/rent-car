import React from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { MENU } from "@/constants/menu";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
// import { useForm } from "react-hook-form";

const CreateRolePage = () => {
  // const { register, handleSubmit } = useForm();
  return (
    <AdminLayout
      title="Role"
      breadcrumb={[
        { title: "Role", path: "/backend/console/role" },
        { title: "Create", path: "/backend/console/role/create" },
      ]}
    >
      <div className="flex items-center justify-center">
        <div className="w-[60%]">
          <div className="w-full">
            <Label>Role Name</Label>
            <Input type="text" className="w-full" />
          </div>
          <div className="w-full">
            <Label>Description</Label>
            <textarea className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-aprimary" rows={4}></textarea>
          </div>
          {MENU.map((menu, menuIndex) => (
            <div key={menuIndex} className="mt-4">
              <div className="flex items-center">
                <div>{menu.icon}</div>
                <div>{menu.name}</div>
              </div>
              <div className="pl-10">
                {menu.list.map((item, listIndex) => (
                  <div key={listIndex} className="h-8 grid grid-cols-12 gap-4 mt-2">
                    <div className="col-span-6">{item.name}</div>
                    <div className="col-span-2">
                      <div className="flex">
                        <Input type="checkbox" className="h-5 w-5" />
                        <Label className="ml-2 mt-2">Read</Label>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex">
                        <Input type="checkbox" className="h-5 w-5" />
                        <Label className="ml-2 mt-2">Write</Label>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex">
                        <Input type="checkbox" className="h-5 w-5" />
                        <Label className="ml-2 mt-2">Delete</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-right mt-4  pt-4">
        <Link href="/backend/console/role">
          <Button variant="danger" className="mr-2">
            Cancel <i className="bi bi-x-circle"></i>
          </Button>
        </Link>
        <Button type="submit">
          Create <i className="bi bi-plus-circle"></i>
        </Button>
      </div>
    </AdminLayout>
  );
};

export default CreateRolePage;
