import { Meta, StoryObj } from "@storybook/react";
import StatsInfo from "../components/StatsInfo";

const meta = {
    title: "Item/Stats",
    component: StatsInfo
} satisfies Meta<typeof StatsInfo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        stats: {
            strength: '10'
        }
    }
}