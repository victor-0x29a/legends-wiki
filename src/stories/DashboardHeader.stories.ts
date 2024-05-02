import { Meta, StoryObj } from "@storybook/react";
import { DashboardHeader } from "../pages/Dashboard/Header";

const meta = {
    title: "Dashboard/Header",
    component: DashboardHeader
} satisfies Meta<typeof DashboardHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
    args: {
        title: 'Home',
        onBackClick: () => console.log('Clicked')
    }
}
