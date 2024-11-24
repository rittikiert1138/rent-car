import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withProtectedUser = (WrappedComponent: any) => {
  return (props: any) => {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (user.length <= 0) {
        router.push("/login");
      }
    }, [user, router]);
    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withProtectedUser;
