"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

const QUICK_QUESTIONS = [
  "What tools do you use?",
  "Share a project you're proud of",
  "What are you working on now?",
];

const formatTime = (date?: Date) =>
  date?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) ?? "";

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

  const {
    messages,
    input,
    status,
    error,
    append,
    handleInputChange,
    handleSubmit,
  } = useChat({
    api: "/api/chat",
    initialMessages: [],
  });

  const hasUserMessages = messages.some((m) => m.role === "user");

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open && scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      if (isAtBottom) scrollToBottom();
    }
  }, [messages, open, scrollToBottom]);

  useEffect(() => {
    if (open && status === "ready") {
      inputRef.current?.focus();
      scrollToBottom();
    }
  }, [open, status, scrollToBottom]);

  const submitQuickQuestion = async (question: string) => {
    append({
      id: "quick-question",
      content: question,
      role: "user",
    });
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="group h-12 w-12 rounded-full shadow-lg sm:h-14 sm:w-14"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6 group-hover:translate-y-0.5 sm:h-8 sm:w-8" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="top"
          align="end"
          className="w-[360px] border-none p-0 shadow-lg sm:w-[440px]"
          sideOffset={16}
        >
          <Card className="overflow-hidden rounded-md border-none pt-0 font-mono">
            <CardHeader className="bg-primary text-primary-foreground flex items-center justify-between py-4">
              <CardTitle>Chat with TrungBot</CardTitle>
              <PopoverClose className="hover:bg-primary/90 flex h-8 w-8 items-center justify-center rounded-full">
                <X className="h-4 w-4" />
              </PopoverClose>
            </CardHeader>

            <ScrollArea className="h-[350px] px-4" ref={scrollRef}>
              <CardContent className="px-1">
                <div
                  role="log"
                  aria-live="polite"
                  aria-label="Chat messages"
                  className="flex flex-col space-y-4"
                >
                  {[greetingMessage, ...messages].map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "flex max-w-[85%] flex-col",
                          msg.role === "user" ? "items-end" : "items-start",
                        )}
                      >
                        <div
                          role="status"
                          aria-live="polite"
                          className={cn(
                            "rounded-lg px-3 py-2 break-words",
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted",
                          )}
                        >
                          {msg.content}
                        </div>
                        <span className="text-muted-foreground mt-1 px-1 text-xs">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {status === "submitted" && (
                    <div className="flex justify-start">
                      <div
                        className="bg-muted rounded-lg px-3 py-2"
                        role="status"
                        aria-live="polite"
                      >
                        <span className="sr-only">TrungBot is typing...</span>{" "}
                        <div className="flex space-x-1">
                          {[0, 150, 300].map((delay) => (
                            <motion.div
                              key={delay}
                              className="bg-primary/60 h-2 w-2 rounded-full"
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.6,
                                delay: delay / 1000,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div
                      className="flex justify-center"
                      role="alert"
                      aria-live="assertive"
                    >
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
                onSubmit={(e) => {
                  handleSubmit(e);
                  inputRef.current?.focus();
                  scrollToBottom();
                }}
                className="relative flex w-full flex-col space-y-2"
              >
                <AnimatePresence>
                  {!hasUserMessages && (
                    <motion.div
                      className="absolute -top-48 left-0 flex flex-col px-2"
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
                        {QUICK_QUESTIONS.map((q) => (
                          <Button
                            key={q}
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-full text-sm"
                            onClick={() => submitQuickQuestion(q)}
                          >
                            {q}
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
                    ref={inputRef}
                    disabled={status !== "ready"}
                    aria-label="Chat message"
                    className="bg-muted h-[64px] w-full resize-none border-0 pr-12"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (input.trim()) {
                          handleSubmit(e);
                          inputRef.current?.focus();
                          setTimeout(() => {
                            scrollToBottom();
                          }, 50);
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
