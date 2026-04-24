export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 px-4 py-3 md:p-4 flex justify-center items-center w-full backdrop-blur bg-background/50 border-b border-white/10 text-foreground z-50">
            <div className="flex items-center gap-2 md:gap-3">
                <img src="/Logo.png" alt="Logo ZapAnalytics"  className="size-8 md:size-10"/>
                <h1 className="font-bold text-2xl md:text-4xl">ZapAnalytics</h1>
            </div>
        </header>
    )
}