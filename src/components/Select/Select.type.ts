export type ISelectOption = {
    value: string;
    label: string;
}

export type ISelectProps = {
    options: ISelectOption[]
    placeholder: string
    onSelect: (value: string) => void
    size?: 'lg' | 'md' | 'sm' | 'xs' | 'md',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    others?: any
}
