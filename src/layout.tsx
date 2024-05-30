import { Outlet } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { LegendsSize } from "./styles/constants.style";
import { Header } from "./components/Header/Header";

const Layout = ({
    children,
    isFreeSizes = false
}: {
    children?: React.ReactNode,
    isFreeSizes?: boolean
}) => {
    return (
        <Container
            maxW={LegendsSize.breakpoints.desktopXL}
            padding={0}
            margin={0}
            {...(isFreeSizes && {
                h: '100vh',
                w: '100vw',
                maxW: 'initial'
            })}
        >
            <Header />
            <Container
                maxW={'1280px'}
                {...(isFreeSizes && {
                    margin: 0,
                    padding: 0,
                    h: 'calc(100% - 80px)',
                    w: '100%',
                    maxW: 'initial'
                })}
            >
                <Outlet />
                {children && children}
            </Container>
        </Container>
    );
}

export default Layout
