import { SearchIcon } from "../../../assets";
import { BaseInputWrapper, InputFieldWrapper, SearchButtonWrapper } from "./styled";

export const InputField = ({ placeholder, handleFocus, handleBlur, handleChange }) => {
    return (
        <InputFieldWrapper width={"100%"}>
            <BaseInputWrapper
                placeholder={placeholder}
                width={"100%"}
                margininlinestart={"0.5rem"}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <SearchButtonWrapper>
                <SearchIcon />
            </SearchButtonWrapper>
        </InputFieldWrapper>
    )
}