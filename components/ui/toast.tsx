import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "./alert";

export function Toast({ message, type, onClose, duration = 5000 }) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			setTimeout(onClose, 300); // Allow time for fade out animation
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	const getAlertVariant = () => {
		switch (type) {
			case "success":
				return "border-green-200 bg-green-50";
			case "error":
				return "border-red-200 bg-red-50";
			case "info":
				return "border-blue-200 bg-blue-50";
			default:
				return "border-gray-200 bg-gray-50";
		}
	};

	const getIconColor = () => {
		switch (type) {
			case "success":
				return "text-green-600";
			case "error":
				return "text-red-600";
			case "info":
				return "text-blue-600";
			default:
				return "text-gray-600";
		}
	};

	if (!isVisible) {
		return null;
	}

	return (
		<div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2">
			<Alert className={getAlertVariant()}>
				<AlertDescription className="flex items-center justify-between">
					<span>{message}</span>
					<button
						onClick={() => {
							setIsVisible(false);
							setTimeout(onClose, 300);
						}}
						className="ml-2 text-gray-400 hover:text-gray-600"
					>
						<X className="h-4 w-4" />
					</button>
				</AlertDescription>
			</Alert>
		</div>
	);
}
