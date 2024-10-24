import { useContext, useMemo } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { I18nContext } from "../../shared/contexts/i18n.context"

import { useEntity } from "./hooks/useEntity"

import { DashboardHeader } from "../Dashboard/Header"
import BasicHeader from "../../components/BasicHeader"
import StatsInfo from "../../components/StatsInfo"
import { GenericError } from "../../generic-error"

import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"
import MDEditor from "@uiw/react-md-editor"

import { CommonLabels } from "../../shared/i18n/commonLabels.i18n"

import { Entities } from "../../entity.constant"
import { HEADER_HEIGHT, LegendsSize } from "../../styles/constants.style"
import type { IItemStats } from "../../types/item.type"

const DEFAULT_CONTAINER_PROPS = {
    paddingTop: LegendsSize.padding.normal,
}

const SkeletonPage = () => {
    return <Box {...DEFAULT_CONTAINER_PROPS}>
        <Box display={"flex"} >
            <Skeleton
                height={"50px"}
                w="100px"
                h={"100px"}
                borderRadius={LegendsSize.padding.normal}
            />
            <Box>
                <Skeleton
                    height={"1rem"} w={"10rem"}
                    marginTop={"1rem"} marginLeft={"0.5rem"}
                />
                <Skeleton
                    height={"1rem"} w={"30rem"}
                    marginTop={"1rem"} marginLeft={"0.5rem"}
                />
            </Box>
        </Box>
        <Box
            display={"flex"} gap="1rem"
            paddingTop={"1rem"} paddingBottom={"1rem"}
        >
            {Array.from({ length: 4 }).map((_, index) => (
                <li
                    key={`skeleton-stats-info-${index}`}
                    style={{ listStyle: "none" }}
                >
                    <Skeleton height={"1rem"} w={"10rem"} />
                </li>
            ))}
        </Box>
        <SkeletonText noOfLines={5} lineHeight={"1rem"} />
    </Box>
}

export const ViewEntityPage = () => {
    const Navigate = useNavigate()

    const { translate } = useContext(I18nContext)

    const { type, id } = useParams()

    const isInvalidEntityType = useMemo(() => !type || !Entities.includes(type), [type])

    const { entity, isLoading } = useEntity(Number(id), !isInvalidEntityType)

    const canCenterStats = useMemo(() => Object.keys(entity?.properties || {}).length < 3, [entity?.properties])

    const imageObject = useMemo(() => {
        if (!entity?.image) return { src: '', alt: '' }

        return { src: entity?.image?.src, alt: entity?.image?.alt }
    }, [entity?.image])

    if (isInvalidEntityType) {
        return <Box w="100%" h={`calc(100vh - ${HEADER_HEIGHT})`}>
            <GenericError errorDetails="Unknown entity" />
        </Box>
    }

    if (isLoading) {
        return <SkeletonPage />
    }

    return <Box {...DEFAULT_CONTAINER_PROPS}>
        <DashboardHeader
            onBackClick={() => Navigate(-1)}
            title={translate(CommonLabels, "Back")}
        />
        <BasicHeader
            title={entity?.title}
            imageDetails={imageObject}
            position="right"
            subtitle={entity?.description} />

        <StatsInfo
            stats={(entity?.properties || {}) as unknown as IItemStats}
            isCentralized={canCenterStats} />

        <MDEditor.Markdown
            source={entity?.sections || ''}
            style={{
                padding: LegendsSize.padding.normal,
                borderRadius: LegendsSize.borderRadius.normal
            }}
        />
    </Box>
}
