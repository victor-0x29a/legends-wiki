
import { Container } from "@chakra-ui/react"
import { entityTypesArray } from "./entity.constant"
import { EntityForm } from "./EntityForm"
import { EntityModel } from "../../api"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const BaseEntityForm = {
    title: "",
    properties: {},
    description: "",
    author: "",
    image: null,
    sections: "",
    type: entityTypesArray[0],
}

export const CreateEntityPage = () => {
    const [isLoading, setIsLoading] = useState(false)

    const Navigate = useNavigate()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = useCallback((values: any) => {
        setIsLoading(true)
        EntityModel.create(values)
            .then(() => {
                toast.success('Entidade criada', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                Navigate("/entity")
            })
            .catch(() => {
                toast.error('Erro ao criar uma entidade', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [Navigate])
    return (
        <Container maxW="800px">
            <EntityForm initialValues={BaseEntityForm} onSubmit={onSubmit} isLoading={isLoading} />
        </Container>
    )
}
