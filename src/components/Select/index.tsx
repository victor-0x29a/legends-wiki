import { useCallback } from "react"

import { Select as ChakraSelect } from "@chakra-ui/react"

import { LegendsColor } from "../../styles/constants.style"

import type { ISelectProps } from "./Select.type"

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
