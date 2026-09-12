import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-lg border border-[#e4e6eb] bg-white px-3.5 py-2 text-sm text-[#1c2b33] transition-colors outline-none placeholder:text-[#8899a6] focus-visible:border-[#0064e0] focus-visible:ring-3 focus-visible:ring-[#0064e0]/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#f5f6f8] disabled:opacity-50 aria-invalid:border-[#b91c1c] aria-invalid:ring-3 aria-invalid:ring-[#b91c1c]/20 dark:bg-[#14161a] dark:border-white/10 dark:text-white",
        className
      )}
      {...props}
    />
  )
}

export { Input }
