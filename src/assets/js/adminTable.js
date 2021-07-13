const tableTitle = [
  {
      text: "",
      align: "start",
      sortable: false,
      value: "User",
      class: "grey lighten-2 subtitle-2 rounded-tl",
  },
  { text: "姓名", value: "User.name", sortable: false, class: "grey lighten-2 subtitle-2", },
  { text: "帳號", value: "User.account", sortable: true, class: "grey lighten-2 subtitle-2", },
  { text: "推文時間", value: "createdAt", sortable: true, width: "auto", class: "grey lighten-2 subtitle-2", },
  { text: "推文內容", value: "description", sortable: false, class: "grey lighten-2 subtitle-2", },
  { text: "刪除", value: "delete", sortable: false, class: "grey lighten-2 subtitle-2 rounded-tr", },
];

export {
  tableTitle
};