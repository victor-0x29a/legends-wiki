import { useCallback, useContext, useEffect, useState } from "react"
import { I18nContext } from "../../../contexts/i18n.context"
import { Box, CircularProgress, Heading, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { LegendsColor, LegendsSize, LegendsValues } from "../../../styles/constants.style"
import { CommonLabels } from "../../../i18n/commonLabels.i18n"
import { useAlert } from "../../../hooks/useAlert"
import { Environment } from "../../../constants"

interface EntityFormImageListModalProps {
    isOpennedModalOfFiles: boolean,
    toggleModalOfFiles: () => void,
}

export const EntityFormImageListModal = ({
    isOpennedModalOfFiles,
    toggleModalOfFiles
}: EntityFormImageListModalProps) => {
    const { translate } = useContext(I18nContext)

    const [loadingProgress, setLoadingProgress] = useState(0)
    const [internalFilesList, setInternalFilesList] = useState([])

    const { alert } = useAlert()

    const copyFileName = useCallback((fileName: string) => {
        alert({ text: translate(CommonLabels, "Name of file has coppied"), type: "success" })
        try {
            if (Environment.isTest) return
            return navigator?.clipboard?.writeText(fileName);
        } catch (error) {
            console.error(error)
        }
    }, [alert, translate])

    const [isLoading, setIsLoading] = useState(true)

    const changeIsLoading = useCallback(() => setTimeout(() => setIsLoading((curr) => !curr), 800), [])

    useEffect(() => {
        if (!isOpennedModalOfFiles) return
        setLoadingProgress(40)
        setTimeout(() => {
            if (!isOpennedModalOfFiles) return
            setLoadingProgress(60)
            fetch('../../src/assets/files.json')
                .then((data) => {
                    setLoadingProgress(80)
                    return data.json().then(setInternalFilesList)
                })
                .finally(() => {
                    setLoadingProgress(100)
                    changeIsLoading()
                })
        }, 1300)
    }, [changeIsLoading, isOpennedModalOfFiles])

    const onClose = useCallback(() => {
        if (isLoading) return
        setIsLoading(true)
        setLoadingProgress(0)
        toggleModalOfFiles()
    }, [toggleModalOfFiles, isLoading])

    return <Modal isOpen={isOpennedModalOfFiles} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
            color={LegendsColor.textColors.gray}
            bgColor={LegendsColor.backgroundColors.primary}
        >
            <ModalCloseButton />
            <ModalBody>
                <Heading as="h6"
                    fontSize={LegendsSize.fontSize.large}
                    marginBottom={2}
                >
                    {translate(CommonLabels, 'List internal images')}
                </Heading>
                {isLoading ? (
                    <Box display={"flex"} justifyContent={"center"}>
                        <CircularProgress value={loadingProgress} marginTop={"1rem"} />
                    </Box>
                ) : (
                    <>
                        <List
                            minH="200px"
                            maxH="200px"
                            overflowY={"auto"}
                            maxW="95%"
                            id="entity-image-list"
                        >
                            {internalFilesList.map((file, index) => (
                                <ListItem
                                    key={`file-${file}-#${index}`}
                                    display={"block"}
                                    cursor={"pointer"}
                                    transitionDuration={LegendsValues.transitionDuration}
                                    _hover={{
                                        color: LegendsColor.textColors.gray
                                    }}
                                    userSelect={"none"}
                                    textAlign={"center"}
                                    onClick={() => copyFileName(file)}
                                >
                                    {file}
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </ModalBody>
        </ModalContent>
    </Modal >
}
