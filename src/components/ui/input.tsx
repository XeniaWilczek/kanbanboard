import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "min-w-0 border-2 border-gray-300 rounded-sm bg-transparent px-2.5 py-1 text-base font-bold ... placeholder:text-muted-foreground placeholder:font-normal ...",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
