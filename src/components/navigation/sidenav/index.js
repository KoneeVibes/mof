import { useNavigate } from "react-router-dom";
import { sideNavItems, entities } from "../../../data";
import { Avatar } from "../../avatar";
import { Li, P } from "../../typography/styled";
import { SideNavItemsListWrapper, SideNavWrapper } from "./styled";

export const SideNav = () => {
    const navigate = useNavigate();
    const navigateToEntityTable = (entity) => {
        const parsedEntity = entity.replace(/\s+/g, '').toLowerCase();
        return navigate(`/${parsedEntity}`);
    }

    return (
        <SideNavWrapper>
            <SideNavItemsListWrapper>
                {sideNavItems.map((sidenavitem, key) => {
                    return (
                        (key === 1) ? (
                            <div key={key}>
                                <P>{sidenavitem.name}</P>
                                <ul>
                                    {entities.map((entity, k) => {
                                        return (
                                            <Li
                                                key={k}
                                                onClick={() => navigateToEntityTable(entity.ministry)}
                                            >
                                                {entity.ministry}
                                            </Li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <P
                                key={key}
                                onClick={(key === 0) ? () => navigate(sidenavitem.url) : null}
                            >
                                {sidenavitem.name}</P>
                        )
                    )
                })}
                <div className="avatar-div">
                    <Avatar location={"side-nav"} />
                </div>
            </SideNavItemsListWrapper>
        </SideNavWrapper>
    )
}