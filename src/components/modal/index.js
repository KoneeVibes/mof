import { useEffect, useRef } from "react";
import { BaseModalWrapper } from "./styled";
import { H2, P } from "../typography/styled";
import { GreenTick } from "../../assets";
import { BaseButton } from "../buttons/styled";

export const BaseModal = ({ open, onClose, message, callToAction, handleCallToActionClick, height, width, className }) => {
    const modalRef = useRef();
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            document.body.style.pointerEvents = "none";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.pointerEvents = "auto";
        }
        const handleClickOutside = (e) => {
            if (open && modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("click", handleClickOutside);
        };
    }, [open, modalRef, onClose]);

    return (
        <BaseModalWrapper
            open={open}
            ref={modalRef}
            height={height}
            width={width}
            className={className}
        >
            <H2>Success!</H2>
            <GreenTick />
            <P>{message}</P>
            <BaseButton
                onClick={handleCallToActionClick}
            >
                {callToAction}
            </BaseButton>
        </BaseModalWrapper>
    )
}