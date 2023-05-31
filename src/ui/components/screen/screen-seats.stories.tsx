import type { Meta, StoryObj } from "@storybook/react";
import ScreenSeats from "./screen-seats";

const meta = {
  title: "Components/ScreenSeats",
  component: ScreenSeats,
} satisfies Meta<typeof ScreenSeats>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: "w-96"
  }
};