export const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3" role="heading" aria-level={2}>
      <div className="bg-primary h-[1.7rem] w-1" aria-hidden="true" />

      <h2 className="text-[1.7rem] leading-none font-bold">
        {title}
        <span className="bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent">
          .
        </span>
      </h2>
    </div>
  );
};
