import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withProtectedAdmin = (WrappedComponent: any) => {
  return (props: any) => {
    const { admin } = useAdmin();
    const router = useRouter();

    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (admin.length <= 0) {
        router.push("/backend/console/login");
      }
    }, [admin, router]);

    // If the user is authenticated, render the WrappedComponent
    // Otherwise, render null while the redirection is in progress
    return admin ? <WrappedComponent {...props} /> : null;
  };
};

export default withProtectedAdmin;
