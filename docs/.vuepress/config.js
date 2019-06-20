module.exports = {
  title: "前端技术团队规范",
  description:
    "此为物必达前端开发团队遵循和约定的开发规范，旨在保持项目代码的整洁、易读、和一致性，更容易被理解和维护。对待规范，要严格遵守；对待风格，要懂得尊重。",
  themeConfig: {
    nav: [
      { text: "组件", link: "/component/" },
      { text: "React", link: "/react/" },
      { text: "Vue", link: "/vue/" },
      {
        text: "公共规范",
        items: [{ text: "CSS 书写规范", link: "/common/css/" }]
      }
    ],
    sidebar: "auto",
    sidebarDepth: 2
  },
  markdown: {
    lineNumbers: true
  },
  base: "/Docs/"
};
