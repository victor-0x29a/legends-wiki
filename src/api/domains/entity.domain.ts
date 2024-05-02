import { CreateEntity, EntityFilters, ListEntityResponse } from "../../types/entity.type";
import { CreateServerInstance } from "../instance";
import { extractData } from "../utils/extract-data";
import { getError } from "../utils/get-error";

const Create = (data: CreateEntity) => CreateServerInstance().post("/entity", data).catch(getError)

const List = (filters: EntityFilters): Promise<ListEntityResponse> => CreateServerInstance().get("/entity", {
    params: filters
}).then(extractData).catch(getError)

export const EntityDomain = {
    Create,
    List
}
