
import Swal from "sweetalert2";

export const alertSuccess = (message: string) => {
  Swal.fire({
    text: message,
    icon: "success",
    confirmButtonText: "ตกลง",
    confirmButtonColor: "#5e72e4",
  })
};

export const alertError = (message: string) => {
  Swal.fire({
    text: message,
    icon: "error",
    confirmButtonText: "ตกลง",
    confirmButtonColor: "#5e72e4",
  });
};
    
export const alertConfirm = (message: string) => {
  Swal.fire({
    text: message,
    icon: "question",
    confirmButtonText: "ตกลง",
    confirmButtonColor: "#5e72e4",
    showCancelButton: true,
    cancelButtonText: "ยกเลิก",
    cancelButtonColor: "#f5365c",
  });
};
    