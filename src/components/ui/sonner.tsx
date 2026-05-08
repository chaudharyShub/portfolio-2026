import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-900/95 group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-white/10 group-[.toaster]:backdrop-blur-xl group-[.toaster]:shadow-[0_10px_40px_-10px_hsl(var(--highlight-purple)/0.5),0_0_0_1px_hsl(0_0%_100%/0.06)_inset]",
          title: "group-[.toast]:text-foreground group-[.toast]:font-semibold",
          description: "group-[.toast]:text-zinc-300",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error:
            "group-[.toaster]:!bg-zinc-900/95 group-[.toaster]:!border-rose-500/40 group-[.toaster]:!shadow-[0_10px_40px_-10px_hsl(var(--highlight-red)/0.55),0_0_0_1px_hsl(var(--highlight-red)/0.25)_inset] group-[.toaster]:[&_[data-icon]]:text-rose-400",
          success:
            "group-[.toaster]:!bg-zinc-900/95 group-[.toaster]:!border-emerald-500/40 group-[.toaster]:!shadow-[0_10px_40px_-10px_hsl(var(--highlight-green)/0.55),0_0_0_1px_hsl(var(--highlight-green)/0.25)_inset] group-[.toaster]:[&_[data-icon]]:text-emerald-400",
          warning:
            "group-[.toaster]:!bg-zinc-900/95 group-[.toaster]:!border-amber-500/40 group-[.toaster]:!shadow-[0_10px_40px_-10px_hsl(45_100%_60%/0.55),0_0_0_1px_hsl(45_100%_60%/0.25)_inset] group-[.toaster]:[&_[data-icon]]:text-amber-400",
          info: "group-[.toaster]:!bg-zinc-900/95 group-[.toaster]:!border-sky-500/40 group-[.toaster]:!shadow-[0_10px_40px_-10px_hsl(210_100%_60%/0.55),0_0_0_1px_hsl(210_100%_60%/0.25)_inset] group-[.toaster]:[&_[data-icon]]:text-sky-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
