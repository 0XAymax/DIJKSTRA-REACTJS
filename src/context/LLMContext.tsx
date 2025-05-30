import React ,{ createContext, useContext, useRef, useState } from "react";
import { toast } from "sonner";
import AIService from "@/api/ai-service"
interface Message {
    id: string
    content: string
    sender: "user" | "ai"
    timestamp: Date
}

export interface LLMContextType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    isLoading: boolean;
    inputRef: React.RefObject<HTMLInputElement | null>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: (input: string, context?: string) => Promise<any>;
}

const LLMContext = createContext<LLMContextType | undefined>(undefined);

export function useLLMContext() {
    const context = useContext(LLMContext);
    if (!context) {
        throw new Error("useLLMContext must be used within a CourseProvider");
    }
    return context;
}

export const LLMContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hello! I am Vertex0, your AI assistant. How can I help you today?",
            sender: "ai",
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSendMessage = async (input :string,context ?:string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input.trim(),
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")
        setIsLoading(true)

        try {
            const response = await AIService.sendMessage(userMessage.content,context)

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: response.response || "Sorry, I couldn't process your request.",
                sender: "ai",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage])
        } catch (error: unknown) {
            console.error("Error sending message:", error)

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "Sorry, an error occurred. Please try again.",
                sender: "ai",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage])
            toast.error("Error while sending the message.");
        } finally {
            setIsLoading(false)
            inputRef.current?.focus()
        }
    }

    const value = {
        isOpen,
        setIsOpen,
        messages,
        setMessages,
        isLoading,
        inputRef,
        inputValue,
        setInputValue,
        handleSendMessage,
    }
    return <LLMContext.Provider value={value} >{ children}</LLMContext.Provider>

}