"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  createBotMessage,
  createUserMessage,
  playTypingSound,
} from "./chatUtils";
import {
  resolveNode,
  updateContext,
  initialContext,
} from "./conversationEngine";

const STORAGE_KEY = "bh_chat_history";
const TYPING_CHAR_RATE = 30;
const TYPING_MIN = 500;
const TYPING_MAX = 2000;

const getTypingDelay = (text) => {
  let delay = (text?.length || 0) * TYPING_CHAR_RATE;
  if (delay < TYPING_MIN) delay = TYPING_MIN;
  if (delay > TYPING_MAX) delay = TYPING_MAX;
  return delay;
};

const saveHistory = (messages) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {}
};

const loadHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState(initialContext); // ← nuevo
  const timeoutRef = useRef(null);

  const processNode = useCallback(
    (nodeId, currentMessages = [], currentContext = initialContext) => {
      const node = resolveNode(nodeId, currentContext); // ← usa engine
      if (!node) return;

      clearTimeout(timeoutRef.current);
      playTypingSound();
      setIsTyping(true);

      const delay = getTypingDelay(node?.text);
      timeoutRef.current = setTimeout(() => {
        const next = [...currentMessages, createBotMessage(node)];
        setMessages(next);
        setIsTyping(false);
        saveHistory(next);
      }, delay);
    },
    [],
  );

  useEffect(() => {
    const saved = loadHistory();
    if (saved?.length) {
      setMessages(saved);
    } else {
      processNode("start", [], initialContext);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [processNode]);

  const handleOptionClick = useCallback(
    (option) => {
      clearTimeout(timeoutRef.current);

      const updatedContext = updateContext(context, option.next); // ← actualiza contexto
      setContext(updatedContext);

      const userMsg = createUserMessage(option.label);
      const updated = [...messages, userMsg];
      setMessages(updated);

      processNode(option.next, updated, updatedContext); // ← pasa contexto
    },
    [messages, context, processNode],
  );

  const resetChat = useCallback(() => {
    clearTimeout(timeoutRef.current);
    clearHistory();
    setMessages([]);
    setIsTyping(false);
    setContext(initialContext); // ← reset contexto
    processNode("start", [], initialContext);
  }, [processNode]);

  return { messages, isTyping, handleOptionClick, resetChat };
};
