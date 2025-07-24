import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import cryptoRandomString from "crypto-random-string";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import axios from "axios";
import { alertSuccess, alertError } from "@/utils/alert";
import router from "next/router";
import { useParams } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { apiInternal, api } from "@/utils/api";

type FormValues = {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
};

const CreateUser = () => {
  const { admin } = useAdmin();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const { user_id } = useParams();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    try {
      const response = await api.get(`/users/${user_id}`);
      setUser(response.data);
    } catch (error: any) {
      console.log("Error ==>", error?.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (user_id) {
      getUser();
    }
  }, [user_id]);

  const handleRandomString = () => {
    const randomString = cryptoRandomString({ length: 6 });
    setValue("password", randomString);
    setValue("confirmPassword", randomString);
    clearErrors(["password", "confirmPassword"]);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        updatedBy: admin.user_id,
      };

      const response = await axios.post(`/api/user/update/${user_id}`, payload);

      if (response.data.status === false) {
        alertError(response.data.message);
      } else {
        alertSuccess(response.data.message);
        router.push("/backend/console/user");
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  console.log("user", user);

  return (
    <AdminLayout
      title="Edit User"
      breadcrumb={[
        { title: "User", path: "/backend/console/user" },
        { title: "Edit", path: "/" },
      ]}
    >
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 justify-center">
            <div className="md:col-span-6 col-span-12">
              <Label>Username</Label>
              <Input
                className={classNames(
                  errors?.username ? "border-danger focus:border-danger" : ""
                )}
                {...register("username", {
                  required: {
                    value: true,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  minLength: {
                    value: 3,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  maxLength: {
                    value: 50,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  pattern: {
                    value: /^[a-z0-9_-]{3,15}$/,
                    message: "รูปแบบข้อมูลไม่ถูกต้อง",
                  },
                })}
                maxLength={50}
                defaultValue={user?.username}
              />
              {errors?.username && (
                <small className="text-danger">{errors.username.message}</small>
              )}
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>Phone</Label>
              <Input
                className={classNames(
                  errors?.phone ? "border-danger focus:border-danger" : ""
                )}
                {...register("phone", {
                  required: {
                    value: true,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  minLength: {
                    value: 10,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  maxLength: {
                    value: 10,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Error pattern",
                  },
                  validate: {
                    checkDigit: (e) =>
                      e.split("")[0] === "0" || "ข้อมูลไม่ถูกต้อง",
                  },
                })}
                defaultValue={user?.phone}
              />
              {errors?.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>Password</Label>
              <Input
                className={classNames(
                  errors?.password ? "border-danger focus:border-danger" : ""
                )}
                {...register("password", {
                  minLength: {
                    value: 4,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  maxLength: {
                    value: 50,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                })}
                maxLength={50}
                // defaultValue={user?.password}
              />
              {errors?.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
              <div>
                <Button
                  type="button"
                  variant="success"
                  className="mt-2"
                  size="sm"
                  onClick={handleRandomString}
                >
                  Generate
                </Button>
              </div>
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>Confirm Password</Label>
              <Input
                className={classNames(
                  errors?.confirmPassword
                    ? "border-danger focus:border-danger"
                    : ""
                )}
                {...register("confirmPassword", {
                  minLength: {
                    value: 4,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  maxLength: {
                    value: 50,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                  validate: {
                    checkSame: (e) =>
                      e === watch("password") || "รหัสผ่านไม่ตรงกัน",
                  },
                })}
                maxLength={50}
                // defaultValue={user?.password}
              />
              {errors?.confirmPassword && (
                <small className="text-danger">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>
            <div className="md:col-span-6 col-span-12">
              <Label>Role {user?.role}</Label>
              <select
                className={classNames(
                  "w-full h-12 border rounded-lg px-2 focus:outline-none focus:border-aprimary",
                  errors?.role ? "border-danger focus:border-danger" : ""
                )}
                {...register("role", {
                  required: {
                    value: true,
                    message: "ข้อมูลไม่ถูกต้อง",
                  },
                })}
                defaultValue={user?.role}
              >
                <option value="">Select</option>
                <option value="ADMIN">ADMIN</option>
                <option value="AGENT">AGENT</option>
              </select>
              {errors?.role && (
                <small className="text-danger">{errors.role.message}</small>
              )}
            </div>
          </div>
          <div className="text-right mt-4  pt-4">
            <Link href="/backend/console/user">
              <Button variant="danger" className="mr-2">
                Cancel <i className="bi bi-x-circle"></i>
              </Button>
            </Link>
            <Button type="submit">
              Create <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
        </form>
      ) : (
        <>Loading...</>
      )}
    </AdminLayout>
  );
};

export default CreateUser;
