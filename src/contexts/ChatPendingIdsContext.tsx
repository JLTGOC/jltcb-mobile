import { createContext, useContext, useState } from "react";

type ChatPendingIdsContextType = {
	pendingClientIds: Set<string>;
	addPending: (id: string) => void;
	removePending: (id: string) => void;
};

const ChatPendingIdsContext = createContext<ChatPendingIdsContextType | null>(
	null,
);

export function ChatPendingIdsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [pendingClientIds, setPendingClientIds] = useState<Set<string>>(
		new Set(),
	);

	const addPending = (id: string) => {
		setPendingClientIds((prev) => new Set(prev).add(id));
	};

	const removePending = (id: string) => {
		setPendingClientIds((prev) => {
			const next = new Set(prev);
			next.delete(id);
			return next;
		});
	};

	return (
		<ChatPendingIdsContext.Provider
			value={{ pendingClientIds, addPending, removePending }}
		>
			{children}
		</ChatPendingIdsContext.Provider>
	);
}

export function useChatPendingIdsContext() {
	const ctx = useContext(ChatPendingIdsContext);
	if (!ctx)
		throw new Error(
			"useChatPendingIdsContext must be used within ChatPendingIdsProvider",
		);
	return ctx;
}
