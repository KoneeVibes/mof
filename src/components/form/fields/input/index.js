import { SearchIcon } from "../../../../assets";
import { BaseInput, InputFieldWrapper, SearchButtonWrapper } from "./style";

export const InputField = ({ placeholder }) => {
    return (
        <InputFieldWrapper width={"100%"}>
            <BaseInput placeholder={placeholder} width={"100%"} />
            <SearchButtonWrapper>
                <SearchIcon />
            </SearchButtonWrapper>
        </InputFieldWrapper>
    )
}