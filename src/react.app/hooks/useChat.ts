import { useState, useCallback } from 'react';
import { Message, SendMessageRequest, SendMessageResponse } from '@/shared/types';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  conversationId: number | null;
  sessionId: string;
}

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    conversationId: null,
    sessionId: crypto.randomUUID(),
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.isLoading) return;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const request: SendMessageRequest = {
        message: content,
        conversation_id: state.conversationId || undefined,
        session_id: state.sessionId,
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SendMessageResponse = await response.json();

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, data.user_message, data.assistant_message],
        conversationId: data.conversation_id,
        isLoading: false,
      }));

    } catch (error) {
      console.error('Failed to send message:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now(),
        conversation_id: state.conversationId || 0,
        role: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        language: 'tr',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
    }
  }, [state.conversationId, state.sessionId, state.isLoading]);

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      conversationId: null,
      sessionId: crypto.randomUUID(),
    });
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    conversationId: state.conversationId,
    sendMessage,
    clearChat,
  };
}
