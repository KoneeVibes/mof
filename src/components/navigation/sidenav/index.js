import { sideNavItems } from "../../../data";
import { Avatar } from "../../avatar";
import { SideNavItemsListWrapper, SideNavWrapper } from "./styled";

export const SideNav = () => {
    return (
        <SideNavWrapper>
            <SideNavItemsListWrapper>
                {sideNavItems.map((sidenavitem, key) => {
                    return (
                        <p key={key}>{sidenavitem.name}</p>
                    )
                })}
                <div className="avatar-div">
                    <Avatar location={"side-nav"} />
                </div>
            </SideNavItemsListWrapper>
        </SideNavWrapper>
    )
}