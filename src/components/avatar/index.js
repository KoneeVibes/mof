// import { ProfilePhoto } from "../../assets";
import { AvatarWrapper } from "./styled";
import profilePhoto from "../../assets/topnav/topnavProfilePhoto.png"
import Cookies from "universal-cookie";

export const Avatar = ({ location }) => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const { email } = cookie.USER || {};

    return (
        <AvatarWrapper location={location}>
            {/* <ProfilePhoto /> */}
            <img src={profilePhoto} alt="profile-photo" />
            <span>{email}</span>
        </AvatarWrapper>
    )
}