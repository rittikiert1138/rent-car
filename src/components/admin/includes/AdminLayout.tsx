import React from "react";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import Sidenav from "./Sidenav";
import TopNav from "./TopNav";
import Link from "next/link";
import "sweetalert2/src/sweetalert2.scss";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/admin/ui/breadcrumb";

const AdminLayout = ({ children, title, breadcrumb }: { children: React.ReactNode; title: string; breadcrumb: { title: string; path: string }[] }) => {
  return (
    <div className="w-full h-[100vh] bg-white">
      <TopNav />
      <Sidenav />
      <div className="pl-[316px] fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] p-[16px] bg-[#f2f2f2]">
        <div className="w-full min-h-20 bg-white shadow-sm rounded-lg p-4">
          <div className="grid grid-cols-12 border-b pb-4 h-12 mb-4">
            <div className="col-span-7 text-right pt-2">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumb.map((item, index) => (
                    <React.Fragment key={`breadcrumb_${index}`}>
                      {index < breadcrumb.length - 1 ? (
                        <>
                          <BreadcrumbItem key={`breadcrumb_${index}`}>
                            <Link href={item.path}>{item.title}</Link>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                        </>
                      ) : (
                        <>
                          <BreadcrumbItem key={`breadcrumb_${index}`}>{item.title}</BreadcrumbItem>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="col-span-5 text-right">
              <h1 className="text-2xl font-bold uppercase">{title}</h1>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default withProtectedAdmin(AdminLayout);
