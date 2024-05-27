import { Box, Heading, Image } from "@chakra-ui/react"
import { DashboardContainer } from "../Dashboard/Container"
import LogoIcon from "../../assets/logo-icon.png"
import { LegendsColor, LegendsSize } from "../../styles/constants.style"
import { SocialMedias } from "../../data/social-media.data"
import { IconWrapper } from "../../components/IconWrapper/IconWrapper"

export const HomePage = () => {
    return <DashboardContainer showHeader={false} onEntityTypeChange={alert}>
        <Box
            w="100%"
            h="100%"
            display={"flex"}
            flexDirection={"column"}
            placeItems={"center"}
            placeContent={"center"}
        >
            <Image
                src={LogoIcon}
                alt="Legends logo"
                objectFit={"cover"}
                width={"200px"}
            />
            <Heading as="h1">
                Primordial Legends
            </Heading>
            <Heading as="h2" color={LegendsColor.textColors.emphasis.primary}>
                Wiki
            </Heading>
            <Box display={"flex"}>
                {SocialMedias.map((media, index) => (
                    <a
                        key={`social-media-${index}`}
                        style={{ margin: LegendsSize.margin.small }}
                        href={media.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {media.logo}
                    </a>
                ))}
            </Box>
        </Box>
    </DashboardContainer>
}
