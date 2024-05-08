import { Meta, StoryObj } from "@storybook/react";
import { IconWrapper } from "../components/IconWrapper/IconWrapper";
import { FaInfo } from 'react-icons/fa'

const meta = {
    title: "Components/IconWrapper",
    component: IconWrapper
} satisfies Meta<typeof IconWrapper>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultWithoutLightMode: Story = {
    args: {
        children: <FaInfo />,
    }
}

export const WithLightMode: Story = {
    args: {
        children: <FaInfo />,
        lightMode: true
    }
}
