import styled from "styled-components";
import { Row } from "../../components/flex/styled";

export const AuthWrapper = styled("div")(() => ({
    height: "100vh",
    overflow: "hidden",
    "@media screen and (max-width: 1024px)": {
        height: "auto",
    },
    ".auth-div": {
        flex: 1,
        backgroundColor: "#F2F4FD",
        height:"100vh",
        objectFit:"cover", 
        "img": {
            margin:"2rem",
            marginTop:"1rem",
            marginBottom:"0rem",
            padding:"1.2rem",
            //objectFit:"cover",
            width: "12rem",
            height: "3rem",
        }
    },
            
    ".text": {
        flex: 1,
        
        
            "h1":{
                marginTop:"1rem",
                marginLeft:"3.2rem",
                fontSize:"bold",
                right: "50%",
                fontFamily:"Inter",
                fontWeight: 700,
            },
            "p":{
                margin:"3.2rem",
                marginTop:"0.7rem",
                marginRight:"3rem",
                fontFamily:"Inter",
                color:"#656F7D",
                fontWeight:"500",
            }
    },
    ".background": {
        flex: 1,
        padding: "11rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flexStart",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        backgroundColor: "white",
    
    },
    ".auth-form-div": {
        flex: 1,
        padding: "2rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flexStart",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "1rem",
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)", 
        backdropFilter: "blur(10px)",
        
        "form": {
            display: "flex",
            flexDirection: "column",
            gap: "var(--flexGap)",
            
        },
    },
    "h1": {
        marginBottom: "0.1rem",
        fontSize: "1.85rem",
        color: "#2A2E34",
        fontFamily: "Inter",
        fontWeight: 700,
    },
    "label": {
        marginBottom: "0.1rem",
        color: "#4F5762",
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize:"0.88rem",
    },
    "P": {
        marginBottom: "2rem",
        color: "#102C57",
        fontWeight: "bold",
    },
    ".showPassword": {
        display: "flex",
        alignItems: "center",
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "#808080",
    },
    ".forgotPassword": {
        color: "#003E06",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "12px",
        marginBlock: 0,
        cursor: "pointer",
        fontFamily: "Inter",
    },
    ".dotLoader": {
        marginLeft: "auto",
        marginRight: "auto",
    },
    ".flex": {
        display: "flex",
        width: "-webkit-fill-available",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "5px 10px",
        border: "1.5px solid #E5E7EF"
    }
}))

export const AuthRow = styled(Row)(() => {
    return {
        height: "inherit",
        gap: 0,
    }
}) 