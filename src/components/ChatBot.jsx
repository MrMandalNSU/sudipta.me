import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Avatar,
  TextField,
  Chip,
  Zoom,
  Collapse,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close,
  Remove,
  Send,
  SmartToy,
  Description,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ChatBubbleOutline,
  OpenInFull,
  CloseFullscreen,
  Launch,
  RestartAlt,
} from "@mui/icons-material";
import { mapSourceFileToRoute, mapSourceFileToName } from "../utils/sourceMapper";
import { BOT_LOGO, SUGGESTED_QUESTIONS } from "../utils/chatbotConfig";


const ChatBot = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleSourceClick = (route) => {
    if (!route) return;
    if (route.startsWith("/Resume") || route.includes("Resume_Sudipta_Mandal.pdf")) {
      setChatState("minimized");
      window.dispatchEvent(new Event("open-resume-modal"));
    } else {
      setChatState("minimized");
      navigate(route);
    }
  };

  const handleNewChat = () => {
    const initialMsg = {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Sudipta's AI assistant. Ask me anything about his work experience, projects, skills, or research!",
      timestamp: new Date().toISOString(),
      sources: [],
    };
    setMessages([initialMsg]);
  };

  // Chat window state: 'closed' | 'open' | 'minimized'
  const [chatState, setChatState] = useState(() => {
    const savedState = sessionStorage.getItem("chat_window_state");
    return savedState || "closed";
  });

  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = sessionStorage.getItem("chat_is_expanded");
    return saved === "true";
  });

  const [showHint, setShowHint] = useState(() => {
    const saved = sessionStorage.getItem("hide_chat_hint");
    return saved !== "true";
  });

  useEffect(() => {
    sessionStorage.setItem("chat_is_expanded", isExpanded ? "true" : "false");
  }, [isExpanded]);

  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem("chat_history");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            id: "welcome",
            role: "assistant",
            content: "Hi! I'm Sudipta's AI assistant. Ask me anything about his work experience, projects, skills, or research!",
            timestamp: new Date().toISOString(),
            sources: [],
          },
        ];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSourcesMap, setShowSourcesMap] = useState({});

  const messagesContainerRef = useRef(null);
  const isFirstMount = useRef(true);

  // Sync state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("chat_window_state", chatState);
  }, [chatState]);

  useEffect(() => {
    sessionStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom on new messages
  const scrollToBottom = (behavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    }
  };

  // Scroll to the top of a specific message
  const scrollToMessage = (msgId, behavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (container) {
      const element = container.querySelector(`#msg-${msgId}`);
      if (element) {
        container.scrollTo({
          top: element.offsetTop - 12,
          behavior,
        });
      }
    }
  };

  useEffect(() => {
    if (chatState === "open") {
      if (messages.length > 1) {
        if (isFirstMount.current) {
          isFirstMount.current = false;
          scrollToBottom("instant");
        } else {
          // If the last message is from the assistant, scroll to it
          const lastMsg = messages[messages.length - 1];
          if (lastMsg && lastMsg.role === "assistant" && lastMsg.id !== "welcome") {
            setTimeout(() => {
              scrollToMessage(lastMsg.id, "smooth");
            }, 100);
          } else {
            scrollToBottom("smooth");
          }
        }
      } else {
        isFirstMount.current = false;
        const container = messagesContainerRef.current;
        if (container) {
          container.scrollTop = 0;
        }
      }
    }
  }, [messages, chatState, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    if (!textToSend) {
      setInput("");
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer || "I couldn't fetch an answer right now.",
        timestamp: new Date().toISOString(),
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I ran into an error connecting to my RAG backend API. Please make sure the backend configuration is correct.",
        timestamp: new Date().toISOString(),
        error: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSources = (msgId) => {
    setShowSourcesMap((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const formatText = (text, isUser) => {
    if (!text) return "";
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      let trimmed = line.trim();
      if (!trimmed) return <Box key={lineIdx} sx={{ height: 8 }} />;

      // Header detection (e.g. ### Header)
      const isHeader = trimmed.startsWith("#");
      let headerLevel = 0;
      if (isHeader) {
        while (trimmed.startsWith("#")) {
          headerLevel++;
          trimmed = trimmed.substring(1);
        }
        trimmed = trimmed.trim();
      }

      // Bullet list item detection
      const isListItem = trimmed.startsWith("* ") || trimmed.startsWith("- ");
      if (isListItem) {
        trimmed = trimmed.substring(2).trim();
      }

      // Inline formatting parser (bold, links, and knowledge source file paths)
      const normalizedLine = trimmed.replace(/\\/g, "/");
      const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\)|knowledge\/[a-zA-Z0-9_\-\/]+\.md)/g;
      const parts = normalizedLine.split(regex);
      const content = parts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("[") && part.includes("](")) {
          const closeBracketIdx = part.indexOf("](");
          const label = part.slice(1, closeBracketIdx);
          const url = part.slice(closeBracketIdx + 2, -1);
          return (
            <a
              key={partIdx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: isUser ? "inherit" : theme.palette.primary.main,
                fontWeight: 600,
                textDecoration: "underline",
                wordBreak: "break-all",
              }}
            >
              {label}
            </a>
          );
        }
        if (part.startsWith("knowledge/") && part.endsWith(".md")) {
          const route = mapSourceFileToRoute(part);
          const displayName = mapSourceFileToName(part);
          if (route) {
            return (
              <a
                key={partIdx}
                href={route}
                onClick={(e) => {
                  e.preventDefault();
                  handleSourceClick(route);
                }}
                style={{
                  color: isUser ? "inherit" : theme.palette.primary.main,
                  fontWeight: 600,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {displayName}
              </a>
            );
          } else {
            return <span key={partIdx} style={{ fontStyle: "italic" }}>{displayName}</span>;
          }
        }
        return part;
      });

      if (headerLevel > 0) {
        return (
          <Typography
            key={lineIdx}
            variant="body2"
            sx={{
              fontWeight: 700,
              mt: 1.5,
              mb: 0.5,
              fontSize: headerLevel === 1 ? "1rem" : (headerLevel === 2 ? "0.95rem" : "0.9rem"),
              color: "text.primary",
              textAlign: "left",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {content}
          </Typography>
        );
      }

      if (isListItem) {
        return (
          <Box
            key={lineIdx}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mb: 0.5,
              ml: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.5,
                fontSize: "0.875rem",
                color: isUser ? "rgba(255, 255, 255, 0.7)" : "text.secondary",
                userSelect: "none",
              }}
            >
              •
            </Typography>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.5,
                textAlign: "left",
                fontSize: "0.875rem",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                flex: 1,
              }}
            >
              {content}
            </Typography>
          </Box>
        );
      }

      return (
        <Typography
          key={lineIdx}
          variant="body2"
          sx={{
            mb: 1,
            lineHeight: 1.6,
            textAlign: "left",
            fontSize: "0.875rem",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {content}
        </Typography>
      );
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        width: chatState === "closed" ? 60 : (isMobile ? "calc(100vw - 32px)" : (isExpanded ? 500 : 340)),
        height: chatState === "closed" ? 60 : (isMobile ? (chatState === "minimized" ? "auto" : "calc(100vh - 48px)") : (chatState === "minimized" ? "auto" : (isExpanded ? "min(680px, calc(100vh - 64px))" : 520))),
        pointerEvents: "none",
        "& > *": {
          pointerEvents: "auto",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      {/* Small Hint Speech Bubble */}
      {chatState === "closed" && !isMobile && showHint && (
        <Zoom in={chatState === "closed" && showHint}>
          <Paper
            elevation={6}
            sx={{
              position: "absolute",
              right: 76,
              bottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 1,
              py: 0.75,
              px: 1.5,
              borderRadius: "16px 16px 4px 16px",
              background: theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(30, 41, 59, 0.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              },
              animation: "floatHint 4s ease-in-out infinite",
              "@keyframes floatHint": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-6px)" },
              },
            }}
            onClick={() => setChatState("open")}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: theme.palette.mode === "light" ? "primary.main" : "secondary.main",
                fontSize: "0.8rem",
              }}
            >
              Ask my AI Assistant! 🤖
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setShowHint(false);
                sessionStorage.setItem("hide_chat_hint", "true");
              }}
              sx={{
                p: 0.25,
                color: "text.secondary",
                "&:hover": { color: "text.primary" },
              }}
            >
              <Close sx={{ fontSize: 12 }} />
            </IconButton>
          </Paper>
        </Zoom>
      )}

      {/* Floating Action Button */}
      <Zoom in={chatState === "closed"}>
        <IconButton
          onClick={() => setChatState("open")}
          aria-label="Open chat assistant"
          sx={{
            width: 60,
            height: 60,
            background: theme.palette.mode === "light"
              ? "linear-gradient(135deg, #4F46E5, #06B6D4)"
              : "linear-gradient(135deg, #818CF8, #22D3EE)",
            color: "white",
            boxShadow: theme.palette.mode === "light"
              ? "0 8px 24px rgba(79, 70, 229, 0.4)"
              : "0 8px 24px rgba(34, 211, 238, 0.4)",
            "&:hover": {
              transform: "translateY(-4px) scale(1.05)",
              boxShadow: theme.palette.mode === "light"
                ? "0 12px 28px rgba(79, 70, 229, 0.6)"
                : "0 12px 28px rgba(34, 211, 238, 0.6)",
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          <ChatBubbleOutline sx={{ fontSize: 28 }} />
          {/* Pulsing indicator */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 14,
              height: 14,
              backgroundColor: "#10B981",
              borderRadius: "50%",
              border: `2px solid ${theme.palette.background.paper}`,
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": {
                  boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.7)",
                },
                "70%": {
                  boxShadow: "0 0 0 8px rgba(16, 185, 129, 0)",
                },
                "100%": {
                  boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)",
                },
              },
            }}
          />
        </IconButton>
      </Zoom>

      {/* Chat Window */}
      <Zoom in={chatState !== "closed"}>
        <Paper
          elevation={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            position: isMobile ? "fixed" : "relative",
            bottom: isMobile ? 16 : 0,
            right: isMobile ? 16 : 0,
            borderRadius: isMobile && chatState !== "minimized" ? 3 : 4,
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            background: theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              background: theme.palette.mode === "light"
                ? "linear-gradient(90deg, #F3F4F6, #E5E7EB)"
                : "linear-gradient(90deg, #1E293B, #0F172A)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                src={BOT_LOGO}
                alt="AI Assistant"
                sx={{
                  width: 36,
                  height: 36,
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
              >
                <SmartToy />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  Sudipta's Assistant
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#10B981",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                    RAG Assistant Online
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {!isMobile && chatState !== "minimized" && (
                <IconButton
                  size="small"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  sx={{ color: "text.secondary" }}
                  aria-label={isExpanded ? "Collapse chat window" : "Expand chat window"}
                >
                  {isExpanded ? <CloseFullscreen sx={{ fontSize: 16 }} /> : <OpenInFull sx={{ fontSize: 16 }} />}
                </IconButton>
              )}
              {!isMobile && (
                <IconButton
                  size="small"
                  onClick={() =>
                    setChatState((prev) => (prev === "minimized" ? "open" : "minimized"))
                  }
                  sx={{ color: "text.secondary" }}
                >
                  <Remove />
                </IconButton>
              )}
              <IconButton
                size="small"
                onClick={() => setChatState("closed")}
                sx={{ color: "text.secondary" }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Minimize toggle for mobile viewports or header clicks */}
          {chatState !== "minimized" && (
            <>
              {/* Messages Area */}
              <Box
                ref={messagesContainerRef}
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  maxHeight: "100%",
                }}
              >
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  const hasSources = msg.sources && msg.sources.length > 0;
                  const isSourcesOpen = showSourcesMap[msg.id];

                  return (
                    <Box
                      key={msg.id}
                      id={`msg-${msg.id}`}
                      sx={{
                        display: "flex",
                        alignSelf: isUser ? "flex-end" : "flex-start",
                        flexDirection: "column",
                        maxWidth: "85%",
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                          background: isUser
                            ? (theme.palette.mode === "light"
                                ? "linear-gradient(135deg, #4F46E5, #3B82F6)"
                                : "linear-gradient(135deg, #6366F1, #3B82F6)")
                            : (theme.palette.mode === "light"
                                ? "rgba(243, 244, 246, 0.9)"
                                : "rgba(30, 41, 59, 0.9)"),
                          color: isUser
                            ? "white"
                            : "text.primary",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          border: isUser
                            ? "none"
                            : "1px solid rgba(255, 255, 255, 0.05)",
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        {formatText(msg.content, isUser)}

                        {/* RAG Sources UI */}
                        {hasSources && (
                          <Box sx={{ mt: 1, borderTop: `1px solid ${theme.palette.divider}`, pt: 1 }}>
                            <Box
                              onClick={() => toggleSources(msg.id)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                opacity: 0.8,
                                "&:hover": { opacity: 1 },
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Description sx={{ fontSize: 14 }} /> Verified Sources ({msg.sources.length})
                              </Typography>
                              {isSourcesOpen ? (
                                <KeyboardArrowUp sx={{ fontSize: 16 }} />
                              ) : (
                                <KeyboardArrowDown sx={{ fontSize: 16 }} />
                              )}
                            </Box>
                            <Collapse in={isSourcesOpen} sx={{ mt: 1 }}>
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                                {msg.sources.map((src, idx) => {
                                    const route = mapSourceFileToRoute(src.sourceFile);
                                    return (
                                      <Box
                                        key={idx}
                                        onClick={() => handleSourceClick(route)}
                                        sx={{
                                          p: 1,
                                          borderRadius: 1,
                                          backgroundColor: theme.palette.mode === "light" ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.5)",
                                          border: "1px solid rgba(255, 255, 255, 0.08)",
                                          cursor: route ? "pointer" : "default",
                                          transition: "all 0.2s ease-in-out",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          gap: 1,
                                          "&:hover": route ? {
                                            backgroundColor: theme.palette.mode === "light"
                                              ? "rgba(79, 70, 229, 0.08)"
                                              : "rgba(34, 211, 238, 0.08)",
                                            borderColor: theme.palette.primary.main,
                                            transform: "translateY(-1px)",
                                          } : {},
                                        }}
                                      >
                                        <Box sx={{ flexGrow: 1 }}>
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              fontWeight: 700,
                                              display: "block",
                                              color: route ? "primary.main" : "text.primary",
                                              textAlign: "left",
                                            }}
                                          >
                                            {src.title}
                                          </Typography>
                                          {src.sourceFile && (
                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6875rem", display: "block", textAlign: "left" }}>
                                              {mapSourceFileToName(src.sourceFile)} • Match: {Math.round(src.similarity * 100)}%
                                            </Typography>
                                          )}
                                        </Box>
                                        {route && (
                                          <Launch
                                            sx={{
                                              fontSize: 14,
                                              color: "text.secondary",
                                              opacity: 0.6,
                                              flexShrink: 0,
                                            }}
                                          />
                                        )}
                                      </Box>
                                    );
                                  })}
                              </Box>
                            </Collapse>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}

                {/* Loading state bubble */}
                {isLoading && (
                  <Box
                    sx={{
                      display: "flex",
                      alignSelf: "flex-start",
                      p: 1.5,
                      borderRadius: "16px 16px 16px 4px",
                      background: theme.palette.mode === "light"
                        ? "rgba(243, 244, 246, 0.9)"
                        : "rgba(30, 41, 59, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      width: "60px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        "& div": {
                          width: 8,
                          height: 8,
                          backgroundColor: theme.palette.text.secondary,
                          borderRadius: "50%",
                          animation: "bounce 1.4s infinite ease-in-out both",
                        },
                        "& div:nth-of-type(1)": { animationDelay: "-0.32s" },
                        "& div:nth-of-type(2)": { animationDelay: "-0.16s" },
                        "@keyframes bounce": {
                          "0%, 80%, 100%": { transform: "scale(0)" },
                          "40%": { transform: "scale(1.0)" },
                        },
                      }}
                    >
                      <div />
                      <div />
                      <div />
                    </Box>
                  </Box>
                )}

                {/* Suggestion Chips (only shown in a new chat session) */}
                {messages.length === 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      alignSelf: "flex-start",
                      maxWidth: "85%",
                      mt: 1.5,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: "text.secondary",
                        fontSize: "0.75rem",
                      }}
                    >
                      Suggested Questions
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {SUGGESTED_QUESTIONS.map((q, idx) => (
                        <Chip
                          key={idx}
                          label={q}
                          onClick={() => handleSendMessage(q)}
                          disabled={isLoading}
                          sx={{
                            fontSize: "0.75rem",
                            py: 1.5,
                            background: theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.08)" : "rgba(129, 140, 248, 0.08)",
                            border: `1px solid ${theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.15)" : "rgba(129, 140, 248, 0.15)"}`,
                            cursor: "pointer",
                            whiteSpace: "normal",
                            height: "auto",
                            "& .MuiChip-label": {
                              display: "block",
                              whiteSpace: "normal",
                              px: 1.5,
                              py: 0.5,
                            },
                            "&:hover": {
                              background: theme.palette.mode === "light" ? "rgba(79, 70, 229, 0.15)" : "rgba(129, 140, 248, 0.15)",
                              transform: "translateY(-1px)",
                            },
                            transition: "all 0.2s",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

              </Box>

              {/* Input Area */}
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                sx={{
                  p: 1.5,
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  background: theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.95)"
                    : "rgba(15, 23, 42, 0.95)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Zoom in={messages.length > 1} mountOnEnter unmountOnExit>
                  <Box sx={{ flexShrink: 0 }}>
                      <IconButton
                        onClick={handleNewChat}
                        disabled={isLoading}
                        sx={{
                          color: "text.secondary",
                          backgroundColor: theme.palette.mode === "light"
                            ? "rgba(0,0,0,0.03)"
                            : "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          "&:hover": {
                            color: "error.main",
                            borderColor: "error.light",
                            backgroundColor: theme.palette.mode === "light"
                              ? "rgba(239, 68, 68, 0.04)"
                              : "rgba(239, 68, 68, 0.08)",
                          },
                          width: 40,
                          height: 40,
                        }}
                        aria-label="Start new chat"
                      >
                        <RestartAlt sx={{ fontSize: 20 }} />
                      </IconButton>
                  </Box>
                </Zoom>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Ask me a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: 3,
                        fontSize: "0.875rem",
                        backgroundColor: theme.palette.mode === "light" ? "rgba(243, 244, 246, 0.8)" : "rgba(30, 41, 59, 0.8)",
                      }
                    }
                  }}
                />
                <IconButton
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  color="primary"
                  sx={{
                    background: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      background: theme.palette.primary.dark,
                    },
                    "&.Mui-disabled": {
                      background: theme.palette.mode === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
                      color: "text.disabled",
                    },
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                  }}
                >
                  <Send sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </>
          )}
        </Paper>
      </Zoom>
    </Box>
  );
};

export default ChatBot;
