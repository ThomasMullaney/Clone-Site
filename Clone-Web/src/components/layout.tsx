import React from "react";
import { Navbar } from "./navbar";
import { Wrapper, WrapperVariant } from "./wrapper";



interface LayoutProps {
    variant?: WrapperVariant
}

export const Layout: React.FC<LayoutProps> = ({children, variant}) => {
    return (
    <>
    <Navbar />
    <Wrapper variant={variant}>
        {children}
    </Wrapper>
    </>
    );
}