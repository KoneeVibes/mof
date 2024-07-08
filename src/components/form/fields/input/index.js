import { SearchIcon } from "../../../../assets";
import { BaseInputWrapper, InputFieldWrapper, SearchButtonWrapper } from "./styled";

export const InputField = ({ placeholder }) => {
    return (
        <InputFieldWrapper width={"100%"}>
            <BaseInputWrapper placeholder={placeholder} width={"100%"} margininlinestart={"0.5rem"} />
            <SearchButtonWrapper>
                <SearchIcon />
            </SearchButtonWrapper>
        </InputFieldWrapper>
    )
}