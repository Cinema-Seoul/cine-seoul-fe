export default function PageHeader({ title }: { title: string }) {
  return (
    <header className="bg-neutral-2 border-b border-solid border-neutral-6">
      <div className="container pt-32">
        <div className="py-6">
          <h2 className="text-2xl font-bold text-primary-11">{title}</h2>
        </div>
      </div>
    </header>
  );
}