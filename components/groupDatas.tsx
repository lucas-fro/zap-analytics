export function GroupDatas({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <section className="flex flex-col gap-4 mt-5 border border-white/10 p-4 w-full max-w-[1200] mx-auto">
        <h1 className="text-foreground font-bold text-3xl">{title}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        {children}
        </div>
    </section>
  )
}
