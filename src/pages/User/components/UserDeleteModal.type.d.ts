export interface IUserDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (id: number) => void;
    userId: number | null;
    isLoading: boolean;
}
