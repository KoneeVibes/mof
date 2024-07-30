import React from "react";
import { SideNav } from "../../components/navigation/sidenav";
import { TopNav } from "../../components/navigation/topnav";
import { LayoutWrapper, MainAreaWrapper } from "./styled";

export const Layout = ({ children }) => {
    return (
        <LayoutWrapper>
            <TopNav />
            <SideNav />
            <MainAreaWrapper>
                {children}
            </MainAreaWrapper>
        </LayoutWrapper>
    )
}