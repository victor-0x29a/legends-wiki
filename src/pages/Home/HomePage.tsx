import { useNavigate } from "react-router-dom"

import { Box, Heading, Image } from "@chakra-ui/react"

import { DashboardContainer } from "../Dashboard/Container"

import LogoIcon from "../../assets/logo-icon.png"

import { SocialMedias } from "../../shared/data/social-media.data"

import { LegendsColor, LegendsSize } from "../../styles/constants.style"

import "./HomePage.style.scss"

export const HomePage = () => {
    const Navigate = useNavigate()

    return <DashboardContainer showHeader={false} onEntityTypeChange={Navigate}>
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
                        className={'social-media-redirect'}
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
