export const MENU = [
  {
    id: 1,
    name: "Home",
    icon: <i className="bi bi-house mr-2 text-aprimary text-xl"></i>,
    list: [
      {
        id: 1,
        name: "Banner",
        path: "/backend/console/banner",
      },
      {
        id: 2,
        name: "Flash News",
        path: "/backend/console/flash-news",
      },
    ],
  },
  {
    id: 2,
    name: "User",
    icon: <i className="bi bi-people mr-2 text-aprimary text-xl"></i>,
    list: [
      {
        id: 3,
        name: "User",
        path: "/backend/console/user",
      },
      {
        id: 4,
        name: "Member",
        path: "/backend/console/member",
      },
    ],
  },
  {
    id: 3,
    name: "หวย",
    icon: <i className="bi bi-copy mr-2 text-aprimary text-xl"></i>,
    list: [
      {
        id: 5,
        name: "หวยไทย",
        path: "/backend/console/lotto/1",
      },
      {
        id: 6,
        name: "หวยออมสิน",
        path: "/backend/console/lotto/2",
      },
      {
        id: 7,
        name: "หวยธกส.",
        path: "/backend/console/lotto/3",
      },
      {
        id: 8,
        name: "หวยลาว",
        path: "/backend/console/lotto/4",
      },
      {
        id: 9,
        name: "หวยลาวพัฒนา",
        path: "/backend/console/lotto/5",
      },
      {
        id: 10,
        name: "หวยฮานอย",
        path: "/backend/console/lotto/6",
      },
      {
        id: 11,
        name: "ฮานอยพิเศษ",
        path: "/backend/console/lotto/7",
      },
      {
        id: 12,
        name: "ฮานอยวีไอพี",
        path: "/backend/console/lotto/8",
      },
    ],
  },
  {
    id: 4,
    name: "ธุรกรรม",
    icon: <i className="bi bi-bank mr-2 text-aprimary text-xl"></i>,
    list: [
      {
        id: 13,
        name: "ฝาก",
        path: "/backend/console/transaction/deposit",
      },
      {
        id: 14,
        name: "ถอน",
        path: "/backend/console/transaction/withdraw",
      },
      {
        id: 15,
        name: "ธนาคาร",
        path: "/backend/console/bank",
      },
    ],
  },
  {
    id: 5,
    name: "Setting",
    icon: <i className="bi bi-gear mr-2 text-aprimary text-xl"></i>,
    list: [
      {
        id: 1,
        name: "Role",
        path: "/backend/console/role",
      },
    ],
  },
];
