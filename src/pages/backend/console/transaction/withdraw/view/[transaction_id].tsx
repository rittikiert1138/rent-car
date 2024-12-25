import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/includes/AdminLayout";
import { api } from "@/utils/api";
import { useParams } from "next/navigation";
import { alertSuccess, alertError } from "@/utils/alert";

const ViewWitdraw = () => {
  const { transaction_id } = useParams();

  const [transaction, setTransactions] = useState(null);
  const [member, setMember] = useState(null);

  const fetchTransaction = async () => {
    try {
      const response = await api.get(`/api/backend/transaction/withdraw/view/${transaction_id}`);

      const { status, message, transaction } = response.data;

      if (status) {
        setTransactions(transaction);
        setMember(transaction.member);
      } else {
        alertError(message);
      }

      console.log("response", response.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (transaction_id) {
      fetchTransaction();
    }
  }, [transaction_id]);

  console.log("transaction", transaction);

  return (
    <AdminLayout title="Transaction" breadcrumb={[{ title: "Transaction", path: "/backend/console/transaction" }]}>
      <div>
        <p>
          <strong>Username</strong> : {member?.username}
        </p>
        <p>
          <strong>Balance</strong> : {member?.balance}
        </p>
        <p>
          <strong>Status</strong> : {member?.status === 1 && <span className="bg-asuccess/20 px-4 text-asuccess rounded font-bold">ปกติ</span>}
          {member?.status === 2 && <span className="bg-warning/20 px-4 text-warning rounded font-bold">กำลังตรวจสอบ</span>}
          {member?.status === 3 && <span className="bg-adanger/20 px-4 text-adanger rounded font-bold">ระงับ</span>}
        </p>
      </div>
    </AdminLayout>
  );
};

export default ViewWitdraw;
