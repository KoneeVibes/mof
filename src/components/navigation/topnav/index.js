import { useNavigate } from "react-router-dom";
import { MoFLogo } from "../../../assets";
import { Avatar } from "../../avatar";
import { MenuButton } from "../../buttons/menubutton";
import { InputField } from "../../formfields/input";
import { LeftSideTopNavWrapper, RightSideTopNavWrapper, TopNavWrapper } from "./styled";

export const TopNav = () => {
    const navigate = useNavigate();
    const navigateToDashboard = () => {
        return navigate('/dashboard');
    }

    return (
        <TopNavWrapper
            alignitems={"center"}
            justifycontent={"space-between"}
        >
            <LeftSideTopNavWrapper
                alignitems={"center"}
                justifycontent={"space-between"}
            >
                <div onClick={navigateToDashboard}>
                    <MoFLogo />
                </div>
                <div className="input-field-div">
                    <InputField placeholder={"Search for a Parastatal"} />
                </div>
            </LeftSideTopNavWrapper>
            <RightSideTopNavWrapper
                alignitems={"center"}
                justifycontent={"flex-end"}
            >
                <Avatar location={"top-nav"} />
                <MenuButton />
            </RightSideTopNavWrapper>
        </TopNavWrapper>
    )
}