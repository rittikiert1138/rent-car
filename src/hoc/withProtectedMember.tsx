import { useMember } from "@/context/MemberContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { jwtVerify } from "jose";

const withProtectedMember = (WrappedComponent: any) => {
  return (props: any) => {
    const { member, setMember } = useMember();
    const router = useRouter();
    const secret: any = process.env.NEXT_PUBLIC_JWT_SECRET_FRONTEND;

    useEffect(() => {
      async function loadUser() {
        try {
          const token = localStorage.getItem("token");
          if (token != null && token.length) {
            const secretKey = Buffer.from(secret, "utf8");
            const { payload } = await jwtVerify(token, secretKey as any);
            if (payload.exp && Date.now() >= payload.exp * 1000) {
              localStorage.removeItem("token");
              setMember(null);
              router.push("/login");
            }
            setMember(payload);
          } else {
            setMember(null);
            localStorage.removeItem("token");
            router.push("/login");
          }
        } catch (error: any) {
          console.log("error ==>", error?.message);
          setMember(null);
          localStorage.removeItem("token");
          router.push("/login");
        }
      }
      loadUser();
    }, [router]);

    return member ? <WrappedComponent {...props} /> : <></>;
  };
};

export default withProtectedMember;
