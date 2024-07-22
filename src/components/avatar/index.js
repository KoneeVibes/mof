// import { ProfilePhoto } from "../../assets";
import { AvatarModalWrapper, AvatarWrapper } from "./styled";
import profilePhoto from "../../assets/topnav/topnavProfilePhoto.png"
import Cookies from "universal-cookie";
import { P } from "../typography/styled";
import React, { useContext } from "react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";

export const Avatar = ({ location }) => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const { email, roles } = cookie.USER || {};

    const navigate = useNavigate();
    const { isavatarmodalopen, setIsAvatarModalOpen } = useContext(Context);

    const handleRedirect = (e, id) => {
        e.preventDefault();
        console.log(id);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        cookies.remove("TOKEN", { path: '/' });
        navigate("/");
    }

    return (
        <AvatarWrapper
            location={location}
            onMouseEnter={() => setIsAvatarModalOpen(1)}
            onMouseLeave={() => setIsAvatarModalOpen(0)}
        >
            {/* <ProfilePhoto /> */}
            <img src={profilePhoto} alt="profile-photo" />
            <span>{email}</span>
            <AvatarModalWrapper
                isavatarmodalopen={isavatarmodalopen}
            >
                {roles?.includes("SuperAdmin") && (
                    <React.Fragment>
                        <P onClick={(e) => handleRedirect(e, "onboardSubAdmin")}>Add SubAdmin</P>
                        <P onClick={(e) => handleRedirect(e, "onboardOrganization")}>Add Organization</P>
                    </React.Fragment>
                )}
                {roles?.includes("SubAdmin") && (
                    <P onClick={(e) => handleRedirect(e, "onboardUser")}>Onboard New User</P>
                )}
                <P onClick={handleLogout}>Logout</P>
            </AvatarModalWrapper>
        </AvatarWrapper>
    )
}