import { CreateEntity, EditEntityPayload, EntityFilters, ListEntityResponse } from "../../types/entity.type";
import { AxiosInstance } from "../instance";
import { extractData } from "../utils/extract-data";
import { getError } from "../utils/get-error";

const Create = (data: CreateEntity) => AxiosInstance.post("/entity", data).catch(getError)

const List = (filters: EntityFilters): Promise<ListEntityResponse> => AxiosInstance.get("/entity", {
    params: filters
}).then(extractData).catch(getError)

const Delete = (id: number) => AxiosInstance.delete(`/entity/${id}`).catch(getError)

const View = (id: number) => AxiosInstance.get(`/entity/${id}`).then(extractData).catch(getError)

const Edit = (id: number, data: EditEntityPayload) => AxiosInstance.put(`/entity/${id}`, data).catch(getError)


export const EntityDomain = {
    Create,
    List,
    Delete,
    View,
    Edit
}
