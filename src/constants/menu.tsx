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
    name: "Lotto",
    icon: <i className="bi bi-copy mr-2 text-aprimary text-xl"></i>,
    list: [
      {
        id: 5,
        name: "Lotto",
        path: "/backend/console/lotto",
      },
      {
        id: 6,
        name: "Lotto Type",
        path: "/backend/console/lotto-type",
      },
    ],
  },
  {
    id: 4,
    name: "ธุรกรรม",
    icon: <i className="bi bi-bank mr-2 text-aprimary text-xl"></i>,
    list: [
      {
        id: 7,
        name: "ฝาก",
        path: "/backend/console/transaction/deposit",
      },
      {
        id: 8,
        name: "ถอน",
        path: "/backend/console/transaction/withdraw",
      },
      {
        id: 9,
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
        name: "ฝาก",
        path: "/backend/console/transaction/deposit",
      },
      {
        id: 2,
        name: "ถอน",
        path: "/backend/console/transaction/withdraw",
      },
      {
        id: 3,
        name: "ธนาคาร",
        path: "/backend/console/bank",
      },
    ],
  },
];
