"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Message, useChat } from "@ai-sdk/react";

const formatTime = (date: Date | undefined) => {
  return date?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
const greetingMessage: Message = {
  id: "welcome",
  content: "Hi! I'm TrungBot 🤖 Ask me anything about my work.",
  role: "assistant",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, status, error } =
    useChat({
      api: "/api/chat",
      initialMessages: [],
    });

  const hasUserMessages = messages.some((message) => message.role === "user");

  useEffect(() => {
    if (!open) return;
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px tolerance

    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (inputRef.current && status === "ready") {
          inputRef.current.focus();
        }
        if (messagesEndRef.current && status === "ready") {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [open, status]);

  const submitQuickQuestion = (question: string) => {
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLTextAreaElement>);
    setTimeout(() => {
      handleSubmit(fakeEvent);
    }, 50);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="group h-12 w-12 rounded-full shadow-lg"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6 group-hover:translate-y-0.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-[360px] border-none p-0 shadow-lg sm:w-[400px]"
          sideOffset={16}
        >
          <Card className="w-full overflow-hidden rounded-md border-none pt-0 font-mono">
            <CardHeader className="bg-primary text-primary-foreground flex items-center justify-between py-4">
              <CardTitle>Chat with TrungBot</CardTitle>
              <PopoverClose
                className="text-primary-foreground hover:bg-primary/90 flex h-8 w-8 items-center justify-center rounded-full"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </PopoverClose>
            </CardHeader>

            <ScrollArea className="h-[350px] px-4 shadow-sm" ref={scrollRef}>
              <CardContent className="px-1">
                <div
                  className="flex flex-col space-y-4"
                  role="log"
                  aria-live="polite"
                  aria-label="Chat messages"
                >
                  {[greetingMessage, ...messages].map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "flex max-w-[85%] flex-col",
                          message.role === "user" ? "items-end" : "items-start",
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2 break-words",
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted",
                          )}
                        >
                          {message.content}
                        </div>
                        <span className="text-muted-foreground mt-1 px-1 text-xs">
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <AnimatePresence>
                    {status === "submitted" && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="bg-primary/60 h-2 w-2 animate-bounce rounded-full" />
                            <div className="bg-primary/60 h-2 w-2 animate-bounce rounded-full delay-150" />
                            <div className="bg-primary/60 h-2 w-2 animate-bounce rounded-full delay-300" />
                          </div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <div className="flex justify-center">
                      <div className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">
                        Error:{" "}
                        {error.message ||
                          "Something went wrong. Please try again."}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
            </ScrollArea>

            <CardFooter className="bg-card px-3">
              <form
                id="chat-form"
                onSubmit={handleSubmit}
                className="relative flex w-full flex-col space-y-2"
              >
                <AnimatePresence>
                  {!hasUserMessages && (
                    <motion.div
                      className="absolute -top-46 left-0 flex flex-col px-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <motion.p
                        className="text-muted-foreground mb-2 px-1 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        Let&apos;s dive in
                      </motion.p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "What are you working on now?",
                          "What technologies do you use?",
                          "Tell me a fun project story",
                        ].map((question) => (
                          <Button
                            key={question}
                            variant="outline"
                            size="sm"
                            className="rounded-full text-sm"
                            onClick={() => submitQuickQuestion(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="relative flex-1">
                  <Textarea
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    className="bg-muted h-[64px] w-full resize-none border-0 pr-12"
                    disabled={status !== "ready"}
                    aria-label="Chat message"
                    ref={inputRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (input.trim() && status === "ready") {
                          handleSubmit(e);
                        }
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || status !== "ready"}
                    className="group absolute right-2 bottom-2"
                    aria-label="Send message"
                  >
                    <Send className="group-hover:translate-y-0.5" />
                  </Button>
                </div>
              </form>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
