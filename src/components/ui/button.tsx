import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#14161a] text-white hover:bg-[#2d3748] shadow-xs dark:bg-white dark:text-[#0a1317] dark:hover:bg-[#f0f2f5]",
        cobalt:
          "bg-[#0064e0] text-white hover:bg-[#004fc4] shadow-xs",
        secondary:
          "border-2 border-[#14161a] text-[#14161a] hover:bg-[#14161a]/5 dark:border-white dark:text-white dark:hover:bg-white/10",
        outline:
          "border border-[#e4e6eb] bg-white text-[#1c2b33] hover:bg-[#f5f6f8] dark:border-white/15 dark:bg-[#14161a] dark:text-white dark:hover:bg-white/10",
        ghost:
          "hover:bg-black/5 text-[#14161a] border-transparent dark:text-white dark:hover:bg-white/10",
        destructive:
          "bg-[#e02424] text-white hover:bg-[#b91c1c] shadow-xs",
        link: "text-[#0064e0] underline-offset-4 hover:underline",
        "pill-tab":
          "bg-white text-[#1c2b33] border border-[#e4e6eb] hover:bg-[#f5f6f8] data-[active=true]:bg-[#14161a] data-[active=true]:text-white data-[active=true]:border-transparent",
      },
      size: {
        default: "h-10 gap-2 px-6 text-sm",
        xs: "h-7 gap-1 px-3 text-xs",
        sm: "h-8 gap-1.5 px-4 text-xs",
        lg: "h-12 gap-2.5 px-8 text-base",
        icon: "size-10 rounded-full",
        "icon-xs": "size-7 rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
