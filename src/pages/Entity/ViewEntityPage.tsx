import { useParams } from "react-router-dom"
import { Entities } from "../../constants"
import { NotFound } from "../../not-found"
import { useEntity } from "./hooks/useEntity"

export const ViewEntityPage = () => {
    const { type, id } = useParams()

    const { entity, isLoading } = useEntity(Number(id))

    if (!type || !Entities.includes(type)) {
        return <NotFound />
    }

    return <div>
        {isLoading ? 'carregando' : JSON.stringify(entity)}
    </div>
}
