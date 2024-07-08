// import { ProfilePhoto } from "../../assets";
import { AvatarWrapper } from "./styled";
import profilePhoto from "../../assets/topnav/topnavProfilePhoto.png"

export const Avatar = ({ location }) => {
    return (
        <AvatarWrapper location={location}>
            {/* <ProfilePhoto /> */}
            <img src={profilePhoto} alt="profile-photo"/>
            <span>Adediji</span>
        </AvatarWrapper>
    )
}