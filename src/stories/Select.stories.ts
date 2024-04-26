import { Meta, StoryObj } from "@storybook/react";
import { Select } from "../components/Select";

const meta = {
    title: "Components/Select",
    component: Select
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' }
        ],
        placeholder: 'Choose an option',
        onSelect: (value: string) => console.log(value),
    }
}