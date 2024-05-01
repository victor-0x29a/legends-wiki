import { Meta, StoryObj } from "@storybook/react";
import { PaginationBar } from "../components/PaginationBar/PaginationBar";

const meta = {
    title: "Components/PaginationBar",
    component: PaginationBar
} satisfies Meta<typeof PaginationBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        isLoading: false,
        onChangePage: () => {},
        onChangePerPage: () => {},
        page: 1,
        perPage: 10,
        totalPages: 100
    }
}

export const Loading: Story = {
    args: {
        isLoading: true,
        onChangePage: () => {},
        onChangePerPage: () => {},
        page: 1,
        perPage: 10,
        totalPages: 100
    }
}

export const LastPage: Story = {
    args: {
        isLoading: false,
        onChangePage: () => {},
        onChangePerPage: () => {},
        page: 100,
        perPage: 10,
        totalPages: 100
    }
}
