import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { Button } from "@/components/admin/ui/button";
import { api } from "@/utils/api";
import { alertSuccess, alertError } from "@/utils/alert";
import dayjs from "dayjs";
import DataTable from "react-data-table-component";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useAdmin } from "@/context/AdminContext";
import CreateModal from "@/components/admin/modal/CreateModal";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { useRouter } from "next/router";
import { LIST_BET_TYPE } from "@/constants/constants";
import Swal from "sweetalert2";
import { getThreeNumber } from "@/utils/utils";

dayjs.extend(buddhistEra);
dayjs.locale("th");

const LottoPage = () => {
  const router = useRouter();
  const { lotto_id } = router.query;
  const { admin } = useAdmin();
  const [limits, setLimits] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [formData, setFormData] = useState({
    number: "",
    price: "",
  });
  const [error, setError] = useState({
    number: false,
    price: false,
  });
  const [limitList, setLimitList] = useState([]);
  const [modal, setModal] = useState(false);
  const [listAll, setListAll] = useState([]);

  const getLimits = async () => {
    try {
      const payload = {
        user_id: admin.user_id,
      };
      const response = await api.post("/api/backend/lotto/limit/list", payload);
      console.log(response.data);
      const { limits, status, message } = response.data;
      if (status === true) {
        setLimits(limits.map((item: any, index: number) => ({ ...item, index: index + 1 })));
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  useEffect(() => {
    if (admin) {
      getLimits();
    }
  }, [admin]);

  const handleDelete = async (lotto_id: number) => {
    try {
      const payload = {
        lotto_id: lotto_id,
      };
      const response = await api.post("/api/backend/lotto/delete", payload);
      if (response.data.status === true) {
        alertSuccess(response.data.message);
        getLimits();
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  const handleChecklist = (e: any) => {
    setFormData({ ...formData, number: "", price: "" });
    if (checklist.includes(e.target.value)) {
      setChecklist(checklist.filter((item: any) => item !== e.target.value));
    } else {
      if (e.target.value === "1") {
        setChecklist([e.target.value]);
      } else if (e.target.value === "2") {
        setChecklist([e.target.value]);
      } else if (e.target.value === "3") {
        const result = checklist.filter((item: any) => item === "4");
        console.log(result);
        setChecklist([...result, e.target.value]);
      } else if (e.target.value === "4") {
        const result = checklist.filter((item: any) => item === "3");
        setChecklist([...result, e.target.value]);
      } else if (e.target.value === "5") {
        const result = checklist.filter((item: any) => item === "6");
        setChecklist([...result, e.target.value]);
      } else if (e.target.value === "6") {
        const result = checklist.filter((item: any) => item === "5");
        setChecklist([...result, e.target.value]);
      }
    }
  };

  const checkMaxLength = () => {
    if (checklist.includes("1") || checklist.includes("2")) {
      return 3;
    } else if (checklist.includes("3") || checklist.includes("4")) {
      return 2;
    } else if (checklist.includes("5") || checklist.includes("6")) {
      return 1;
    }
  };

  const handleAddList = () => {
    if (formData.number === "") {
      setError({ ...error, number: true });
    } else if (formData.price === "") {
      setError({ ...error, price: true });
    } else {
      let currentList = [...limitList];
      for (let i = 0; i < checklist.length; i++) {
        const checkDuplicate = currentList.filter((item: any) => item.number === formData.number && item.type === checklist[i]);
        if (checkDuplicate.length > 0) {
          alertError("มีตัวเลขอั้นนี้อยู่แล้ว");
        } else {
          if (checklist[i] === "2") {
            const listNumber = getThreeNumber(formData.number);
            for (let x = 0; x < listNumber.length; x++) {
              const _list = listNumber[x];
              let result = {
                number: _list,
                price: formData.price,
                type: checklist[i],
              };
              currentList.push(result);
            }
          } else {
            let result = {
              number: formData.number,
              price: formData.price,
              type: checklist[i],
            };
            currentList.push(result);
          }
        }
        setLimitList(currentList);
        setFormData({ ...formData, number: "", price: "" });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setModal(false);
      const payload = {
        user_id: admin.user_id,
        lotto_id: lotto_id,
        limit_list: limitList,
      };
      const response = await api.post("/api/backend/lotto/limit/create", payload);
      if (response.data.status === true) {
        getLimits();
        alertSuccess(response.data.message);
        setFormData({ ...formData, number: "", price: "" });
      } else {
        alertError(response.data.message);
      }
    } catch (error) {
      alertError(error.message);
    }
  };

  const handleSelectAll = (e: any) => {
    if (listAll.includes(e.target.value)) {
      setListAll(listAll.filter((item: any) => item !== e.target.value));
    } else {
      setListAll([...listAll, e.target.value]);
    }
  };

  const handleDeleteAll = () => {
    Swal.fire({
      text: "Are you sure you want to delete this?",
      icon: "question",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#5e72e4",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#f5365c",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        const response = await api.post("/api/backend/lotto/limit/delete", { lists: listAll.map((item: any) => Number(item)) });

        if (response.data.status === false) {
          alertError(response.data.message);
        } else {
          alertSuccess(response.data.message);
          getLimits();
          setListAll([]);
        }
      }
    });
  };

  const columns = [
    {
      name:
        listAll.length > 0 ? (
          <Button className="border h-10" variant="danger" onClick={handleDeleteAll}>
            <i className="bi bi-trash3"></i>
          </Button>
        ) : (
          ""
        ),
      width: "90px",
      cell: (row: any) => (
        <>
          <input type="checkbox" value={`${row.lotto_limit_list_id}`} onChange={(e) => handleSelectAll(e)} checked={listAll.includes(`${row.lotto_limit_list_id}`)} />
        </>
      ),
    },
    {
      name: "ประเภท",
      sortable: true,
      selector: (row: any) => LIST_BET_TYPE.find((item: any) => item.betTypeId === row.bet_type)?.label,
    },
    {
      name: "เลขอั้น",
      sortable: true,
      selector: (row: any) => row.limit_number,
    },
    {
      name: "ราคาจ่าย",
      sortable: true,
      selector: (row: any) => row.limit_amount,
    },
    {
      name: "",
      sortable: false,
      center: true,
      width: "20%",
      cell: (row: any) => (
        <>
          <Button className="border h-10" variant="danger" onClick={() => handleDelete(row.lotto_id)}>
            <i className="bi bi-trash3"></i>
          </Button>
        </>
      ),
    },
  ];

  return (
    <AdminLayout title="หวย" breadcrumb={[{ title: "หวย", path: "/backend/console/lotto" }]}>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-6">{/* <h3 className="text-2xl font-bold">หวยไทย</h3> */}</div>
        <div className="col-span-6 text-right">
          <Button onClick={() => setModal(true)}>
            สร้าง <i className="bi bi-plus-lg"></i>
          </Button>
        </div>
      </div>
      <DataTable fixedHeader persistTableHead={true} className="border" columns={columns} data={limits} pagination />
      {modal && (
        <CreateModal>
          <div className="relative">
            <Button className="absolute -top-[20px] -right-[20px]" size="sm" variant="danger" onClick={() => setModal(false)}>
              <i className="bi bi-x-lg"></i>
            </Button>
            <h1>เพิ่มเลขอั้น</h1>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-2">
                <div className="flex">
                  <input type="checkbox" className="mr-2" value={1} onChange={(e) => handleChecklist(e)} checked={checklist.includes("1")} />
                  <Label className="mt-[3px]">3 ตัวบน</Label>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex">
                  <input type="checkbox" className="mr-2" value={2} onChange={(e) => handleChecklist(e)} checked={checklist.includes("2")} />
                  <Label className="mt-[3px]">3 ตัวโต๊ด</Label>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex">
                  <input type="checkbox" className="mr-2" value={3} onChange={(e) => handleChecklist(e)} checked={checklist.includes("3")} />
                  <Label className="mt-[3px]">2 ตัวบน</Label>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex">
                  <input type="checkbox" className="mr-2" value={4} onChange={(e) => handleChecklist(e)} checked={checklist.includes("4")} />
                  <Label className="mt-[3px]">2 ตัวล่าง</Label>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex">
                  <input type="checkbox" className="mr-2" value={5} onChange={(e) => handleChecklist(e)} checked={checklist.includes("5")} />
                  <Label className="mt-[3px]">วิ่งบน</Label>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex">
                  <input type="checkbox" className="mr-2" value={6} onChange={(e) => handleChecklist(e)} checked={checklist.includes("6")} />
                  <Label className="mt-[3px]">วิ่งล่าง</Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 mt-4">
              <div className="col-span-6">
                <Label className="mt-[3px]">ตัวเลขอั้น</Label>
                <Input
                  placeholder="ตัวเลขอั้น"
                  maxLength={checkMaxLength()}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  disabled={checklist.length === 0}
                  onChange={(e) => {
                    setFormData({ ...formData, number: e.target.value });
                    setError({ ...error, number: false });
                  }}
                  value={formData.number}
                  className={error.number ? "border-red-500" : ""}
                />
                {error.number && <p className="text-red-500 text-sm">กรุณาระบุตัวเลขอั้น</p>}
              </div>
              <div className="col-span-6">
                <Label className="mt-[3px]">ราคาจ่าย</Label>
                <Input
                  placeholder="ราคาจ่าย"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  disabled={checklist.length === 0}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                    setError({ ...error, price: false });
                  }}
                  value={formData.price}
                  maxLength={3}
                  className={error.price ? "border-red-500" : ""}
                />
                {error.price && <p className="text-red-500 text-sm">กรุณาระบุราคาจ่าย</p>}
              </div>
              <div className="col-span-12 text-right">
                <Button onClick={handleAddList}>เพิ่ม</Button>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200 my-4"></div>
            <h1>รายการเลขอั้น</h1>

            <div className="flex">
              <div className="w-[45%]">ตัวเลขอั้น</div>
              <div className="w-[45%]">ราคาจ่าย</div>
            </div>
            {limitList.length > 0 ? (
              limitList.map((item: any, index: number) => (
                <div className="flex" key={index}>
                  <div className="w-[45%] border h-10 pl-2 pt-1">{item.number}</div>
                  <div className="w-[45%] border h-10 pl-2 pt-1">{item.price}</div>
                  <div className="w-[10%] border h-10 pl-2 pt-1 text-center">
                    <Button variant="danger" onClick={() => handleDelete(item.number)} size="sm">
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-500">ยังไม่มีเลขอั้น</span>
            )}
            {limitList.length > 0 && (
              <div className="w-full text-right mt-4">
                <Button onClick={handleSubmit}>
                  ยืนยัน
                  <i className="bi bi-plus-lg"></i>
                </Button>
              </div>
            )}
          </div>
        </CreateModal>
      )}
    </AdminLayout>
  );
};

export default withProtectedAdmin(LottoPage);
