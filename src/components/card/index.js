import { CardWrapper } from "./styled";

export const Card = ({ children }) => {
    return (
        <CardWrapper
            className="card-component"
        >
            {children}
        </CardWrapper>
    )
}