
export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <img src="/img-static/LogoKohiiNight.webp" className="size-5 fill-current text-white dark:text-black"  alt={"logo"}/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Kohaii Arts</span>
            </div>
        </>
    );
}
