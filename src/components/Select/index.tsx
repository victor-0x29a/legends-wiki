import { Select as ChakraSelect } from "@chakra-ui/react"
import { ISelectProps } from "./Select.type"
import { LegendsColor } from "../../styles/constants.style"

export const Select = ({
    options,
    onSelect,
    placeholder,
    size = 'lg',
    others
}: ISelectProps) => {
    return (
        <ChakraSelect
            placeholder={placeholder}
            size={size}
            {...others}
            borderColor={LegendsColor.backgroundColors.secondary}
        >
            {options.map(({ value, label }) => (
                <option
                    key={value}
                    value={value}
                    onClick={() => onSelect(value)}
                >
                    {label}
                </option>
            ))}
        </ChakraSelect>
    )
}
