import * as React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<hr
			ref={ref}
			className={cn("border-0 h-px bg-accent", className)}
			{...props}
		/>
	);
});

Separator.displayName = "Separator";

export { Separator };
