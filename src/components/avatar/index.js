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
    const { email, role, userId } = cookie.USER || {};

    const navigate = useNavigate();
    const { isavatarmodalopen, setIsAvatarModalOpen } = useContext(Context);

    const handleRedirect = (e, id) => {
        e.preventDefault();
        switch (id) {
            case "onboardSubAdmin":
                navigate(`/registration/${userId}/subadmin`);
                break;
            case "onboardUser":
                navigate(`/registration/${userId}/onboard/user`);
                break;
            case "onboardOrganization":
                navigate(`/registration/${userId}/entity`);
                break;
            case "addNewProject":
                navigate("/registration/project");
                break;
            case "addFundingSource":
                navigate(`/registration/${userId}/funding`);
                break;
            case "onboardCurrency":
                navigate(`/registration/${userId}/currency`);
                break;
            case "addCollection":
                navigate(`/registration/${userId}/collection`);
                break;
            default:
                break;
        }
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
                {(role === "SuperAdmin") && (
                    <React.Fragment>
                        <P onClick={(e) => handleRedirect(e, "onboardSubAdmin")}>Add SubAdmin</P>
                        <P onClick={(e) => handleRedirect(e, "onboardOrganization")}>Add Organization</P>
                        <P onClick={(e) => handleRedirect(e, "addCollection")}>Add New Collection</P>
                    </React.Fragment>
                )}
                {(role === "SubAdmin") && (
                    <React.Fragment>
                        <P onClick={(e) => handleRedirect(e, "addNewProject")}>Add New Project</P>
                        <P onClick={(e) => handleRedirect(e, "addFundingSource")}>Add Funding Source</P>
                        <P onClick={(e) => handleRedirect(e, "onboardUser")}>Onboard New User</P>
                        <P onClick={(e) => handleRedirect(e, "onboardCurrency")}>Onboard New Currency</P>
                    </React.Fragment>
                )}
                <P onClick={handleLogout}>Logout</P>
            </AvatarModalWrapper>
        </AvatarWrapper>
    )
}