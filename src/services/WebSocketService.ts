/**
 * WebSocket Service for real-time communication
 */

export interface WebSocketMessage {
  type: 'message' | 'error' | 'status';
  id?: string;
  conversation_id?: string;
  content?: string;
  role?: 'user' | 'assistant' | 'system';
  timestamp?: string;
  error?: string;
}

interface WebSocketCallbacks {
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
}

class WebSocketService {
  private socket: WebSocket | null = null;
  private callbacks: WebSocketCallbacks = {};
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private baseUrl = import.meta.env.VITE_WEBSOCKET_URL || 'wss://api.example.com/ws';

  /**
   * Connect to WebSocket for a specific conversation
   */
  connect(conversationId: string, callbacks: WebSocketCallbacks = {}) {
    // Disconnect if already connected
    if (this.socket) {
      this.disconnect();
    }

    this.callbacks = callbacks;
    const url = `${this.baseUrl}/conversations/${conversationId}`;
    
    try {
      this.socket = new WebSocket(url);
      
      this.socket.onopen = (event) => {
        console.log('WebSocket connection established');
        this.reconnectAttempts = 0;
        if (this.callbacks.onOpen) this.callbacks.onOpen(event);
      };
      
      this.socket.onmessage = (event) => {
        if (this.callbacks.onMessage) this.callbacks.onMessage(event);
      };
      
      this.socket.onerror = (event) => {
        console.error('WebSocket error:', event);
        if (this.callbacks.onError) this.callbacks.onError(event);
      };
      
      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        if (this.callbacks.onClose) this.callbacks.onClose(event);
        
        // Attempt to reconnect if not closed cleanly
        if (event.code !== 1000 && event.code !== 1001) {
          this.attemptReconnect(conversationId);
        }
      };
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
      if (this.callbacks.onError) {
        this.callbacks.onError(new Event('error'));
      }
    }
  }

  /**
   * Send a message through the WebSocket
   */
  send(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const messageString = typeof message === 'string' 
        ? message 
        : JSON.stringify(message);
      
      this.socket.send(messageString);
      return true;
    }
    return false;
  }

  /**
   * Disconnect the WebSocket
   */
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.callbacks = {};
    }
  }

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }

  /**
   * Attempt to reconnect with exponential backoff
   */
  private attemptReconnect(conversationId: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached. Giving up.');
      return;
    }
    
    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), 30000);
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`);
      this.connect(conversationId, this.callbacks);
    }, delay);
  }
}

// Export singleton instance
export default new WebSocketService(); 