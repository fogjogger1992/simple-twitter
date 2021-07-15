const tableTitle = [
  {
      text: "頭像",
      align: "start",
      sortable: false,
      value: "User",
      class: "grey lighten-2 subtitle-2 rounded-tl",
  },
  { text: "姓名", value: "User.name", sortable: false, class: "grey lighten-2 subtitle-2", },
  { text: "帳號", value: "User.account", sortable: true, class: "grey lighten-2 subtitle-2", },
  { text: "推文時間", value: "createdAt", sortable: true, width: "auto", class: "grey lighten-2 subtitle-2", },
  { text: "推文內容(前50字)", value: "description", sortable: false, width: "35%", class: "grey lighten-2 subtitle-2", },
  { text: "", value: "delete", sortable: false, width: "5%", class: "grey lighten-2 subtitle-2 rounded-tr", },
];

export {
  tableTitle
};