import { Box, Button, FormLabel, Heading, Input, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { LegendsColor, LegendsSize } from "../../styles/constants.style"
import { IItemStats } from "../../types/item.type"
import { useCallback, useContext, useMemo, useState } from "react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useAlert } from "../../hooks/useAlert"
import { I18nContext } from "../../contexts/i18n.context"
import { ErrorList } from "../../i18n/errors.i18n"
import { FormLabels } from "../../i18n/forms.i18n"

type EntityFormPropertiesProps = {
    onChange: (value: object) => void,
    value: IItemStats,
    isLoading?: boolean
}

export const EntityFormProperties = ({
    onChange,
    value,
    isLoading = false
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

    const { alert } = useAlert()

    const { translate } = useContext(I18nContext)

    const onSubmit = useCallback(() => {
        if (!form.name) {
            return alert({ text: translate(ErrorList, "The property name cannot be empty") })
        }
        if (!form.value) {
            return alert({ text: translate(ErrorList, "The property value cannot be empty") })
        }
        if (value?.[form.name]) {
            return alert({ text: translate(ErrorList, "Already exists a property with this name") })
        }
        onChange({ ...value, [form.name]: form.value })
        setForm({
            name: "",
            value: ""
        })
    }, [form.name, form.value, value, onChange, alert, translate])

    const deleteIcon = useCallback((key: string) => {
        onChange({ ...value, [key]: undefined })
    }, [onChange, value])

    return <>
        <Heading size={"md"} marginTop={LegendsSize.margin.normal} marginBottom={LegendsSize.margin.small}>{translate(FormLabels, "Properties")}</Heading>
        <Box w={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"} w="100%">
                <Box w={"35%"}>
                    <FormLabel>{translate(FormLabels, "Name of the property")}</FormLabel>
                    <Input value={form.name} placeholder={translate(FormLabels, "Put the name")} type="text" onChange={(event) => setForm((curr) => ({ ...curr, name: event.target.value }))} disabled={isLoading} />
                </Box>
                <Box w={"35%"}>
                    <FormLabel>{translate(FormLabels, "Value of the property")}</FormLabel>
                    <Input value={form.value} placeholder={translate(FormLabels, "Put the value")} type="text"
                        onChange={(event) => setForm((curr) => ({ ...curr, value: event.target.value }))} disabled={isLoading} />
                </Box>

                <Box w={"25%"} display={"flex"} alignItems={"end"}>
                    <Button colorScheme="green" w={"90%"} onClick={onSubmit}>{translate(FormLabels, "Add")}</Button>
                </Box>
            </Box>
            {showTable && (
                <TableContainer marginTop={LegendsSize.margin.normal}>
                    <Table size="md">
                        <Thead>
                            <Tr>
                                <Th color={LegendsColor.textColors.white}>{translate(FormLabels, "Property")}</Th>
                                <Th color={LegendsColor.textColors.white}>{translate(FormLabels, "Value")}</Th>
                                <Th color={LegendsColor.textColors.white}>{translate(FormLabels, "Action")}</Th>
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
