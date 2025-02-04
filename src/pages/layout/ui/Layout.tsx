import { Layout as AntDLayout } from "antd";
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/Header/Header";

const Layout: FC = () => {
  return (
    <AntDLayout style={{ minHeight: "100vh" }}>
      <Header />
      <Suspense fallback={"Loading..."}>
        <Outlet />
      </Suspense>
    </AntDLayout>
  );
};

export default Layout;
