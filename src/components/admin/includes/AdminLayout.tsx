import React, { useEffect, useState } from "react";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import Sidenav from "./Sidenav";
import TopNav from "./TopNav";
import Link from "next/link";
import "sweetalert2/src/sweetalert2.scss";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/admin/ui/breadcrumb";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children, title, breadcrumb, loading = false }: { children: React.ReactNode; title: string; breadcrumb: { title: string; path: string }[]; loading: boolean }) => {
  const currentPath = usePathname();

  const [toggle, setToggle] = useState<any>(false);

  useEffect(() => {
    setToggle(false);
  }, [currentPath]);

  return (
    <div className="w-full h-[100vh] bg-white">
      <TopNav setToggle={setToggle} toggle={toggle} />
      <Sidenav toggle={toggle} />
      <div className="md:pl-[316px] pl-[16px] fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] p-[16px] bg-[#f2f2f2] overflow-y-auto">
        <div className="w-full min-h-20 bg-white shadow-sm rounded-lg p-4 relative z-10">
          {loading && (
            <div className="absolute top-0 right-0 bg-black/25 z-20 w-full h-full rounded-lg">
              <div className="w-full h-full  relative">
                <div className="absolute -translate-y-1/2 -translate-x-1/2  top-1/2 left-1/2 w-[100px] h-[100px] rounded-lg">
                  <img src="/icons/loading.gif" className="w-full" />
                </div>
              </div>
            </div>
          )}
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
              <h1 className="text-1xl font-bold uppercase">{title}</h1>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default withProtectedAdmin(AdminLayout);
