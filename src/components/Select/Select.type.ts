import { SelectProps } from "@chakra-ui/react";

export type ISelectOption = {
    value: string;
    label: string;
}

export type ISelectProps = {
    options: ISelectOption[]
    placeholder: string
    onSelect: (value: string) => void
    size?: 'lg' | 'md' | 'sm' | 'xs' | 'md'
    others?: SelectProps
}
