import { Select as ChakraSelect } from "@chakra-ui/react"
import { ISelectProps } from "./Select.type"

export const Select = ({
    options,
    onSelect,
    placeholder,
    size = 'lg',
    others
}: ISelectProps) => {
    return (
        <ChakraSelect placeholder={placeholder} size={size} {...others}>
            {options.map(({ value, label }) => (
                <option key={value} value={value} onClick={() => onSelect(value)}>{label}</option>
            ))}
        </ChakraSelect>
    )
}