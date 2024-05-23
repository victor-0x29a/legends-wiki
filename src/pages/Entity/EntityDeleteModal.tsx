import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useCallback, useContext } from "react";
import { I18nContext } from "../../contexts/i18n.context";
import { CommonLabels } from "../../i18n/commonLabels.i18n";
import { LegendsColor } from "../../styles/constants.style";

type IEntityDeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (id: number) => void;
    entityID: number | null;
    isLoading: boolean;
}

export const EntityDeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    entityID,
    isLoading
}: IEntityDeleteModalProps) => {
    const { translate } = useContext(I18nContext)

    const onCloseMiddleware = useCallback(() => {
        if (isLoading) return
        onClose()
    }, [isLoading, onClose])

    return <Modal isOpen={isOpen} onClose={onCloseMiddleware}>
        <ModalOverlay />
        <ModalContent color={LegendsColor.textColors.gray} bgColor={LegendsColor.backgroundColors.primary}>
            <ModalHeader>
                {translate(CommonLabels, "Delete entity")}
            </ModalHeader>
            <ModalCloseButton
                cursor={isLoading ? "progress" : "pointer"}
                id={"close-btn-delete-entity-modal"}
            />
            <ModalBody>
                {translate(CommonLabels, "You want to delete entity with ID")} {entityID}?
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="green" onClick={() => onConfirm(entityID!)} isLoading={isLoading} loadingText={translate(CommonLabels, "Deleting entity")}>
                    {translate(CommonLabels, "Delete")}
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}
