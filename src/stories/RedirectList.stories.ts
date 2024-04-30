import { Meta, StoryObj } from "@storybook/react";
import { RedirectList } from "../components/RedirectList/RedirectList";

const meta = {
    title: "Item/RedirectList",
    component: RedirectList
} satisfies Meta<typeof RedirectList>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
    args: {
        list: [
            {
                title: "Foo",
                path: "/bar"
            },
            {
                title: "Baz",
                path: "/fooz"
            }
        ]
    }
}
