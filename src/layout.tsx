import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { LegendsSize } from "./styles/constants.style";
import { Header } from "./components/Header/Header";

const Layout = () => {
    return (
        <Container maxW={LegendsSize.breakpoints.desktopXL} padding={0} margin={0}>
            <Header />
            <Container maxW={`1280px`}>
                <Outlet />
            </Container>
        </Container>
    );
}

export default Layout
