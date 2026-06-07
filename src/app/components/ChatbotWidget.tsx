/* Minimal static “chatbot” widget driven by predefined Q&A.
 * No real AI – just mapped questions and constant answers from `chatbotData`.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { chatbotQuestions, type ChatbotQA } from "./chatbotData";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, ChevronDown } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
};

const BOT_NAME = "Portfolio Assistant";

const initialBotMessage =
  "Hi! I’m your portfolio assistant. You can pick a question below to learn more about Tasmia, her skills, projects, or how to contact her.";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "bot-0", role: "bot", text: initialBotMessage },
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState<ChatbotQA | null>(
    null
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleQuestionClick = (qa: ChatbotQA) => {
    setSelectedQuestion(qa);

    // push user message + bot answer
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${qa.id}-${prev.length}`,
        role: "user",
        text: qa.question,
      },
      {
        id: `bot-${qa.id}-${prev.length}`,
        role: "bot",
        text: qa.answer,
      },
    ]);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        onClick={isOpen ? handleToggle : handleOpen}
        className="fixed bottom-20 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#1f2937] bg-[#050505]/90 text-[#e5e7eb] shadow-lg shadow-black/40 backdrop-blur-sm transition hover:scale-105 hover:border-[#22c55e]/60 hover:text-[#bbf7d0] md:bottom-20 md:right-8"
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-40 w-[320px] max-w-[90vw] rounded-2xl border border-[#111827] bg-[#050505]/95 text-sm text-[#e5e7eb] shadow-2xl shadow-black/60 backdrop-blur-xl md:bottom-28 md:right-8 md:w-[360px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#111827] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#22c55e]/70 via-[#16a34a]/80 to-[#4ade80]/60 text-xs font-semibold text-black shadow shadow-emerald-500/40">
                  TK
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold tracking-wide text-[#e5e7eb]">
                    {BOT_NAME}
                  </span>
                  <span className="text-[10px] text-[#6b7280]">
                    Always-on portfolio guide
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-transparent text-[#6b7280] transition hover:border-[#1f2937] hover:bg-[#020617] hover:text-[#e5e7eb]"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex max-h-[60vh] flex-col gap-2 px-4 py-3">
              {/* Message list */}
              <div className="scrollbar-thin mb-2 flex max-h-[32vh] flex-col gap-2 overflow-y-auto pr-1">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#16a34a]/90 text-black"
                          : "bg-[#020617]/90 text-[#e5e7eb] border border-[#111827]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions */}
              <div className="space-y-1.5 border-t border-[#111827] pt-2">
                <div className="flex items-center justify-between text-[10px] text-[#6b7280]">
                  <span>Quick questions</span>
                  <span className="inline-flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 opacity-60" />
                    tap to ask
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {chatbotQuestions.map((qa) => (
                    <button
                      key={qa.id}
                      type="button"
                      onClick={() => handleQuestionClick(qa)}
                      className={`rounded-full border px-3 py-1 text-[11px] transition ${
                        selectedQuestion?.id === qa.id
                          ? "border-[#22c55e]/70 bg-[#022c22] text-[#bbf7d0]"
                          : "border-[#111827] bg-[#020617]/60 text-[#9ca3af] hover:border-[#22c55e]/60 hover:text-[#e5e7eb]"
                      }`}
                    >
                      {qa.question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;

