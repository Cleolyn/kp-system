import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-3 py-0.5 text-xs font-bold whitespace-nowrap transition-all focus-visible:ring-3 focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default: "bg-[#14161a] text-white",
        secondary: "bg-[#f5f6f8] text-[#1c2b33] border border-[#e4e6eb]",
        outline: "border border-[#e4e6eb] text-[#1c2b33] bg-white",
        cobalt: "bg-[#0064e0]/10 text-[#0064e0] border border-[#0064e0]/20",
        success: "bg-[#00875a]/10 text-[#00875a] border border-[#00875a]/20",
        attention: "bg-[#f59e0b]/15 text-[#b45309] border border-[#f59e0b]/30",
        warning: "bg-[#ffd700] text-[#0a1317] border border-[#ffd700]",
        critical: "bg-[#e02424]/10 text-[#e02424] border border-[#e02424]/20",
        destructive: "bg-[#e02424]/10 text-[#e02424] border border-[#e02424]/20",
        ghost: "hover:bg-black/5 text-[#657786]",
        link: "text-[#0064e0] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
