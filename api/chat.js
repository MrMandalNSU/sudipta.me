/* global process */
export default async function handler(request, response) {
  // Allow cross-origin requests (CORS) if needed, but since it's same-origin, Vercel handles it.
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = request.body || {};

  if (!message) {
    return response.status(400).json({ error: 'Message is required' });
  }

  const endpoint = process.env.CHAT_API_ENDPOINT;
  const apiKey = process.env.CHAT_API_KEY;

  // Graceful fallback for mock configurations
  if (!endpoint || endpoint.includes('mock.rag.endpoint') || apiKey === 'mock_api_key_123') {
    return response.status(200).json({
      answer: `Hello! I am Sudipta's AI assistant. (Running in Mock Mode)\n\nTo configure the real assistant, please set the CHAT_API_ENDPOINT and CHAT_API_KEY environment variables.\n\nYour message was: "${message}"`,
      sources: [
        {
          sourceFile: "knowledge/resume/resume-overview.md",
          title: "System Mock Configuration Guide",
          chunkIndex: 1,
          similarity: 1.0
        }
      ]
    });
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
      headers['x-api-key'] = apiKey;
    }

    const apiResponse = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return response.status(apiResponse.status).json({
        error: `RAG API error: ${errorText || apiResponse.statusText}`
      });
    }

    const data = await apiResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    console.error('Chat proxy error:', error);
    return response.status(500).json({
      error: 'Internal server error while calling RAG chatbot'
    });
  }
}
