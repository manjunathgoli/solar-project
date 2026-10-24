import { describe, expect, it } from 'vitest';
import { limitChatResponse, limitChatStreamChunk, MAX_CHAT_RESPONSE_LINES } from './chat-response.js';

describe('chat response line limits', () => {
  it('limits complete responses to fewer than 100 lines', () => {
    const result = limitChatResponse(Array.from({ length: 120 }, (_, index) => `Line ${index + 1}`).join('\n'));

    expect(result.text.split('\n')).toHaveLength(MAX_CHAT_RESPONSE_LINES);
    expect(result.truncated).toBe(true);
  });

  it('limits streamed chunks across chunk boundaries', () => {
    const prefix = 'Line\n'.repeat(98);
    const finalChunk = limitChatStreamChunk('Line 99\nLine 100', 98);
    const streamed = prefix + finalChunk.text;

    expect(streamed.split('\n')).toHaveLength(99);
    expect(finalChunk.truncated).toBe(true);
  });
});
