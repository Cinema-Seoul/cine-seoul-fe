import MainLayout from "./_layouts/main-layout";
import { Button } from "@/components/ui";

export default function IndexPage() {
  return (
    <MainLayout>
      <div>Hello World!</div>
      <h1>Button</h1>
      <Button variant="text" tint="primary">Hello</Button>
    </MainLayout>
  );
}
