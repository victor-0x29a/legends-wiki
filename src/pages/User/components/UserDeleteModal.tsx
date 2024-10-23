import { useCallback, useContext } from "react";

import { I18nContext } from "../../../contexts/i18n.context";

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

import { CommonLabels } from "../../../i18n/commonLabels.i18n";
import { LegendsColor } from "../../../styles/constants.style";

import type { IUserDeleteModalProps } from './UserDeleteModal.type'

export const UserDeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    userId,
    isLoading
}: IUserDeleteModalProps) => {
    const { translate } = useContext(I18nContext)

    const onCloseMiddleware = useCallback(() => {
        if (isLoading) return
        onClose()
    }, [isLoading, onClose])

    return <Modal isOpen={isOpen} onClose={onCloseMiddleware}>
        <ModalOverlay />
        <ModalContent color={LegendsColor.textColors.gray} bgColor={LegendsColor.backgroundColors.primary}>
            <ModalHeader>
                {translate(CommonLabels, "Delete user")}
            </ModalHeader>
            <ModalCloseButton
                cursor={isLoading ? "progress" : "pointer"}
                id={"close-btn-delete-entity-modal"}
            />
            <ModalBody>
                {translate(CommonLabels, "You want to delete user with ID")} {userId}?
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="green" onClick={() => onConfirm(userId!)} isLoading={isLoading} loadingText={translate(CommonLabels, "Deleting user")}>
                    {translate(CommonLabels, "Delete")}
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}
