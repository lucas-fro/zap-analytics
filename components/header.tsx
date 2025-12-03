export function Header() { 
    return (
        <header className="fixed p-4 flex justify-center items-center w-full backdrop-blur bg-background/30 border border-white/10 text-foreground z-50">
            <div className="flex items-center gap-3">
                <img src="Logo.png" alt="Logo ZapAnaliytics"  className="size-10"/>
                <h1 className="font-bold text-4xl">ZapAnalytics</h1>
            </div>
        </header>
    )
}