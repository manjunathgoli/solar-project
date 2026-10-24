export const MAX_CHAT_RESPONSE_LINES = 99;

export function limitChatResponse(text) {
  const lines = String(text).split(/\r\n|\r|\n/);
  return {
    text: lines.slice(0, MAX_CHAT_RESPONSE_LINES).join('\n'),
    truncated: lines.length > MAX_CHAT_RESPONSE_LINES,
  };
}

export function limitChatStreamChunk(chunk, emittedLineBreaks) {
  const maxLineBreaks = MAX_CHAT_RESPONSE_LINES - 1 - emittedLineBreaks;
  let lineBreaks = 0;

  for (let index = 0; index < chunk.length; index += 1) {
    if (chunk[index] !== '\n' && chunk[index] !== '\r') continue;
    if (chunk[index] === '\r' && chunk[index + 1] === '\n') index += 1;

    if (lineBreaks === maxLineBreaks) {
      return { text: chunk.slice(0, index), lineBreaks, truncated: true };
    }

    lineBreaks += 1;
  }

  return { text: chunk, lineBreaks, truncated: false };
}
