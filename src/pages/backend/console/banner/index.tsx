import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import withProtectedAdmin from "@/hoc/withProtectedAdmin";
import Link from "next/link";
import { Button } from "@/components/admin/ui/button";
import { alertError } from "@/utils/alert";
import { api } from "@/utils/api";
import { Switch } from "@/components/admin/ui/switch";
// import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
// import styled from "styled-components";

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
// const reorder = (list: any[], startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle,
// });

// const getListStyle = (isDraggingOver: boolean) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

const BannerPage = () => {
  const [banners, setBanners] = useState<any[]>([]);

  const getBanners = async () => {
    try {
      const response = await api.get("/api/backend/banner/list");

      if (response.data.status) {
        setBanners(response.data.banners);
      } else {
        alertError(response.data.message);
      }
    } catch (error) {
      console.log("Error getBanners ==>", error);
      alertError("เกิดข้อผิดพลาด");
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handleChangeStatus = async (banner_id: number, banner_status: number) => {
    try {
      const payload = {
        banner_id: banner_id,
        banner_status: banner_status === 1 ? 0 : 1,
      };
      const response = await api.post("/api/backend/banner/change-status", payload);
      if (response.data.status === true) {
        getBanners();
      } else {
        alertError(response.data.message);
      }
    } catch (error: any) {
      alertError(error.message);
    }
  };

  // const [items, setItems] = useState<any[]>(getItems(10));

  // const onDragEnd = (result: any) => {
  //   console.log("result", result);
  //   // const { source, destination } = result;
  //   // if (!destination) return;
  //   // const items = reorder(banners, source.index, destination.index);
  //   // console.log("items", items);
  //   // setBanners(items);
  // };

  // const handleDragEnd = (result: DropResult) => {
  //   const { source, destination } = result;

  //   if (!destination) return; // Dropped outside

  //   const reorderedData = Array.from(data);
  //   const [removed] = reorderedData.splice(source.index, 1);
  //   reorderedData.splice(destination.index, 0, removed);

  //   setData(reorderedData);
  // };

  //   const Container = styled.div`
  //   margin: 10px;
  //   border: 1px solid black;
  // `;

  return (
    <AdminLayout title="Banner" breadcrumb={[{ title: "Banner", path: "/backend/console/banner" }]}>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-6"></div>
        <div className="col-span-6 text-right">
          <Link href="/backend/console/banner/create">
            <Button className="bg-aprimary">
              สร้าง <i className="bi bi-plus-lg"></i>
            </Button>
          </Link>
        </div>
      </div>
      <table className="w-full border-collapse border rounded-lg">
        <thead>
          <tr className="border h-12">
            <th className="w-[5%]">ลำดับ</th>
            <th className="w-[25%]">รูปภาพ</th>
            <th className="w-[25%]">สถานะ</th>
            <th className="w-[25%]"></th>
          </tr>
        </thead>
        <tbody>
          {banners.length > 0 ? (
            banners.map((banner, index) => (
              <tr className="border h-12" key={index}>
                <td className="text-center">{banner.order_seq}</td>
                <td>
                  <img src={`/uploads/banners/${banner.banner_image}`} alt="banner" className="w-[80px] block mx-auto" />
                </td>
                <td className="text-center">
                  <Switch checked={banner.banner_status === 1 ? true : false} onCheckedChange={() => handleChangeStatus(banner.banner_id, banner.banner_status)} />
                </td>
                <td className="text-center">
                  <Link href={`/backend/console/banner/edit/${banner.banner_id}`}>
                    <Button className="bg-aprimary">แก้ไข</Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default withProtectedAdmin(BannerPage);
