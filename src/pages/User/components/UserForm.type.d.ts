export type initialValuesUserForm = {
    name?: string,
    username: string,
    password?: string
}

export interface IUserFormProps {
    initialValues: initialValuesUserForm,
    onSubmit: (values: initialValuesUserForm) => void,
    isLoading?: boolean,
    isEdition?: boolean
}
