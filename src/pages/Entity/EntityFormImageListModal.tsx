import { useCallback, useContext, useEffect, useState } from "react"
import { I18nContext } from "../../contexts/i18n.context"
import { CircularProgress, Heading, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { LegendsColor, LegendsSize, LegendsValues } from "../../styles/constants.style"
import { CommonLabels } from "../../i18n/commonLabels.i18n"
import { useAlert } from "../../hooks/useAlert"

type EntityFormImageListModalProps = {
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
        alert({ text: translate(CommonLabels, "Image coppied"), type: "success" })
        return navigator.clipboard.writeText(fileName)
    }, [alert, translate])

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
                .finally(() => setLoadingProgress(100))
        }, 1300)
    }, [isOpennedModalOfFiles])

    return <Modal isOpen={isOpennedModalOfFiles} onClose={toggleModalOfFiles}>
        <ModalOverlay />
        <ModalContent color={LegendsColor.textColors.gray} bgColor={LegendsColor.backgroundColors.primary}>
            <ModalCloseButton />
            <ModalBody>
                {(loadingProgress !== 100) ? (
                    <CircularProgress value={loadingProgress} />
                ) : (
                    <>
                        <Heading as="h6" fontSize={LegendsSize.fontSize.large} marginBottom={2}>
                            {translate(CommonLabels, 'List internal images')}
                        </Heading>
                        <List
                            minH="200px"
                            maxH="200px"
                            overflowY={"auto"}
                            maxW="95%"
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
