import React from "react";
import { SideNav } from "../../components/navigation/sidenav";
import { TopNav } from "../../components/navigation/topnav";
import { DashboardWrapper, MainAreaWrapper } from "./styled";

export const Dashboard = ({ children }) => {
    return (
        <DashboardWrapper>
            <TopNav />
            <SideNav />
            <MainAreaWrapper>
                {children}
            </MainAreaWrapper>
        </DashboardWrapper>
    )
}