import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import i18n from "../i18n";

export const startTour = async (navigate) => {
  // ALWAYS START FROM DASHBOARD
  navigate("/dashboard");

  // WAIT FOR PAGE RENDER
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const driverObj = driver({
    showProgress: true,
    animate: true,
    smoothScroll: true,
    allowClose: true,

    overlayColor: "rgba(15, 23, 42, 0.78)",

    nextBtnText: i18n.t("tour next"),
    prevBtnText: i18n.t("tour back"),
    doneBtnText: i18n.t("tour finish"),

    stagePadding: 12,
    popoverOffset: 14,

    steps: [
      // DASHBOARD
      {
        element: "#dashboard-overview",
        popover: {
          title: i18n.t("dashboard overview"),
          description: i18n.t("tour dashboard desc"),
          side: "bottom",
          align: "start",
        },
      },

      {
        element: "#upload-receipt-btn",
        popover: {
          title: i18n.t("tour upload title"),
          description: i18n.t("tour upload desc"),
          side: "bottom",
        },
      },

      {
        element: "#add-transaction-btn",
        popover: {
          title: i18n.t("tour add transaction title"),
          description: i18n.t("tour add transaction desc"),
          side: "bottom",
        },
      },

      {
        element: "#stats-section",
        popover: {
          title: i18n.t("tour stats title"),
          description: i18n.t("tour stats desc"),
          side: "top",
        },
      },

      {
        element: "#recent-logs",
        popover: {
          title: i18n.t("tour logs title"),
          description: i18n.t("tour logs desc"),
          side: "top",
        },
      },

      // SIDEBAR
      {
        element: "#analytics-nav",
        popover: {
          title: i18n.t("tour analytics title"),
          description: i18n.t("tour analytics desc"),
          side: "right",
        },
      },

      {
        element: "#ai-nav",
        popover: {
          title: i18n.t("tour ai title"),
          description: i18n.t("tour ai desc"),
          side: "right",
        },
      },

      {
        element: "#reports-nav",
        popover: {
          title: i18n.t("tour reports title"),
          description: i18n.t("tour reports desc"),
          side: "right",
        },
      },

      {
        element: "#settings-nav",
        popover: {
          title: i18n.t("tour settings title"),
          description: i18n.t("tour settings desc"),
          side: "right",
        },
      },

      // PROFILE
      {
        element: "#profile-section",
        popover: {
          title: i18n.t("tour profile title"),
          description: i18n.t("tour profile desc"),
          side: "top",
        },
      },
    ],

    // CUSTOM STYLING
    popoverClass: "cashflow-tour-popover",

    onDestroyed: () => {
      localStorage.setItem("tourCompleted", "true");
    },
  });

  // SMALL FIX FOR SIDEBAR SCROLL/RENDER
  requestAnimationFrame(() => {
    driverObj.drive();
  });
};