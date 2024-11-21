import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const withProtectedUser = (WrappedComponent: any) => {
  return (props: any) => {
    const { admin } = useUser();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (admin.length <= 0) {
        router.push("/login");
      }
    }, [admin, router]);

    // If the user is authenticated, render the WrappedComponent
    // Otherwise, render null while the redirection is in progress
    return admin ? <WrappedComponent {...props} /> : null;
  };
};

export default withProtectedUser;
