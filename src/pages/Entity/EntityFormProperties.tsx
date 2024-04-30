import { Box, Button, FormLabel, Heading, Input, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { LegendsColor, LegendsSize } from "../../styles/constants.style"
import { IItemStats } from "../../types/item.type"
import { useCallback, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { DeleteIcon } from "@chakra-ui/icons"

type EntityFormPropertiesProps = {
    onChange: (value: object) => void,
    value: IItemStats
}

export const EntityFormProperties = ({
    onChange,
    value
}: EntityFormPropertiesProps) => {
    const previewData = useMemo(() => Object.entries(value).map(([key, value]) => ({
        key,
        value
    })), [value])

    const showTable = useMemo(() => previewData.length > 0 && previewData.filter(({ value }) => Boolean(value)).length > 0, [previewData])

    const [form, setForm] = useState({
        name: "",
        value: ""
    })

    const alert = useCallback((message: string) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }, [])

    const onSubmit = useCallback(() => {
        if (!form.name) {
            return alert("O nome da propriedade não pode ser vazio.")
        }
        if (!form.value) {
            return alert("O valor da propriedade não pode ser vazio.")
        }
        if (value?.[form.name]) {
            return alert("Já existe uma propriedade com esse nome.")
        }
        onChange({ ...value, [form.name]: form.value })
        setForm({
            name: "",
            value: ""
        })
    }, [form.name, form.value, onChange, value, alert])

    const deleteIcon = useCallback((key: string) => {
        onChange({ ...value, [key]: undefined })
    }, [onChange, value])

    return <>
        <Heading size={"md"} marginTop={LegendsSize.margin.normal} marginBottom={LegendsSize.margin.small}>Propriedades</Heading>
        <Box w={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"} w="100%">
                <Box w={"35%"}>
                    <FormLabel>Nome da propriedade</FormLabel>
                    <Input value={form.name} placeholder="Coloque o nome" type="text" onChange={(event) => setForm((curr) => ({ ...curr, name: event.target.value }))} />
                </Box>
                <Box w={"35%"}>
                    <FormLabel>Valor da propriedade</FormLabel>
                    <Input value={form.value} placeholder="Coloque o valor" type="text"
                        onChange={(event) => setForm((curr) => ({ ...curr, value: event.target.value }))} />
                </Box>

                <Box w={"25%"} display={"flex"} alignItems={"end"}>
                    <Button colorScheme="green" w={"90%"} onClick={onSubmit}>Adicionar</Button>
                </Box>
            </Box>
            {showTable && (
                <TableContainer marginTop={LegendsSize.margin.normal}>
                    <Table size="md">
                        <Thead>
                            <Tr>
                                <Th color={LegendsColor.textColors.white}>Propriedade</Th>
                                <Th color={LegendsColor.textColors.white}>Valor</Th>
                                <Th color={LegendsColor.textColors.white}>Ação</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {previewData.map(({
                                key,
                                value
                            }, index) => value && (
                                <Tr key={`${key}:${value}-#${index}-entity-form-properties`}>
                                    <Th color={LegendsColor.textColors.gray}>{key}</Th>
                                    <Th color={LegendsColor.textColors.gray}>{value}</Th>
                                    <Th color={LegendsColor.textColors.gray}>
                                        <DeleteIcon cursor={"pointer"} onClick={() => deleteIcon(key)} />
                                    </Th>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    </>
}
