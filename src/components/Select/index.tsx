import { Select as ChakraSelect } from "@chakra-ui/react"
import { ISelectProps } from "./Select.type"
import { LegendsColor } from "../../styles/constants.style"
import { useCallback } from "react"

export const Select = ({
    options,
    onSelect,
    placeholder,
    size = 'lg',
    others
}: ISelectProps) => {
    const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value)
    }, [onSelect])
    return (
        <ChakraSelect
            placeholder={placeholder}
            size={size}
            {...others}
            borderColor={LegendsColor.backgroundColors.secondary}
            onChange={handleChange}
        >
            {options.map(({ value, label }) => (
                <option
                    key={value}
                    value={value}
                >
                    {label}
                </option>
            ))}
        </ChakraSelect>
    )
}
