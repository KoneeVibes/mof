import { sideNavItems } from "../../../data";
import { Avatar } from "../../avatar";
import { P } from "../../typography/styled";
import { SideNavItemsListWrapper, SideNavWrapper } from "./styled";

export const SideNav = () => {
    return (
        <SideNavWrapper>
            <SideNavItemsListWrapper>
                {sideNavItems.map((sidenavitem, key) => {
                    return (
                        <P key={key}>{sidenavitem.name}</P>
                    )
                })}
                <div className="avatar-div">
                    <Avatar location={"side-nav"} />
                </div>
            </SideNavItemsListWrapper>
        </SideNavWrapper>
    )
}