import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { jwtVerify } from "jose";

const withProtectedAdmin = (WrappedComponent: any) => {
  return (props: any) => {
    const { admin, setAdmin } = useAdmin();
    const router = useRouter();
    const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_BACKEND;

    useEffect(() => {
      async function loadUser() {
        try {
          const token = localStorage.getItem("token");
          if (token != null && token.length) {
            const secretKey = Buffer.from(secret, "utf8");
            const { payload } = await jwtVerify(token, secretKey as any);

            if (payload.exp && Date.now() >= payload.exp * 1000) {
              localStorage.removeItem("token");
              setAdmin(null);
              router.push("/backend/console/login");
            }
            setAdmin(payload);
          } else {
            setAdmin(null);
            localStorage.removeItem("token");
            router.push("/backend/console/login");
          }
        } catch (error: any) {
          console.log("error ==>", error?.message);
          setAdmin(null);
          localStorage.removeItem("token");
          router.push("/backend/console/login");
        }
      }
      loadUser();
    }, [router]);

    return admin ? <WrappedComponent {...props} /> : <></>;
  };
};

withProtectedAdmin.displayName = "WithProtectedAdmin";

export default withProtectedAdmin;
