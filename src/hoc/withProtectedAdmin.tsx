import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withProtectedAdmin = (WrappedComponent: any) => {
  return (props: any) => {
    const { admin } = useAdmin();
    const test = useAdmin();
    const router = useRouter();

    useEffect(() => {
      if (admin.length <= 0) {
        router.push("/backend/console/login");
      }
    }, [admin, router]);
    return admin ? <WrappedComponent {...props} /> : <>pppp</>;
  };
};

export default withProtectedAdmin;
