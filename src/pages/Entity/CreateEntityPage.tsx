
import { Container } from "@chakra-ui/react"
import { entityTypesArray } from "./entity.constant"
import { EntityForm } from "./EntityForm"

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
    return (
        <Container maxW="800px">
            <EntityForm initialValues={BaseEntityForm} onSubmit={console.log} />
        </Container>
    )
}
