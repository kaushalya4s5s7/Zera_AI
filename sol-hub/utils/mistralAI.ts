const MISTRAL_API_KEY = "4Hk5KPNIv56QTS9Gnr3PPW8Xw3k2afBt";
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

interface MistralRequestOptions {
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function callMistralAI({
  messages,
  model = "mistral-small-latest",
  temperature = 0.7,
  maxTokens = 2000,
}: MistralRequestOptions) {
  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Mistral API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Mistral AI:", error);
    throw error;
  }
}

// Specialized methods for different AI capabilities
export async function generateSmartContract(
  prompt: string,
  contractType: string
) {
  const systemPrompt = `You are an expert blockchain developer. Create a secure, optimized ${contractType} smart contract based on the user's requirements. Return only the Solidity code with proper comments.`;

  return callMistralAI({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
  });
}

export async function analyzeContractSecurity(code: string, chain: string) {
  const systemPrompt = `You are a smart contract security expert. Analyze the following contract code for security vulnerabilities, potential gas optimizations and best practices. Focus on issues specific to ${chain} blockchain. Format your response with clear headings and bullet points. Include severity levels for each issue.`;

  return callMistralAI({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: code },
    ],
    temperature: 0.3,
    maxTokens: 3000,
  });
}

export async function generateContractDocumentation(
  code: string,
  framework: string
) {
  const systemPrompt = `You are a technical documentation expert. Create comprehensive documentation for the following smart contract code in ${framework} style format. Include function descriptions, parameter details, return values, events, and usage examples. Format in markdown.`;

  return callMistralAI({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: code },
    ],
    temperature: 0.4,
    maxTokens: 3000,
  });
}

export async function generateContractTests(code: string, framework: string) {
  const systemPrompt = `You are an expert in smart contract testing. Create comprehensive test cases for the following smart contract code using the ${framework} testing framework. Include tests for all functions, edge cases, and error conditions. Return only the test code with proper comments.`;

  return callMistralAI({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: code },
    ],
    temperature: 0.4,
    maxTokens: 3000,
  });
}

// Function to simulate the test results (in a real scenario, this would be handled by a backend)
export function simulateTestResults() {
  return {
    passed: Math.floor(Math.random() * 3) + 3,
    failed: Math.floor(Math.random() * 2),
    results: [
      {
        id: 1,
        name: "Should set the right owner",
        status: "passed",
        duration: "0.23s",
      },
      {
        id: 2,
        name: "Should assign total supply to owner",
        status: "passed",
        duration: "0.18s",
      },
      {
        id: 3,
        name: "Should transfer tokens between accounts",
        status: "passed",
        duration: "0.45s",
      },
      {
        id: 4,
        name: "Should fail if sender doesn't have enough tokens",
        status: Math.random() > 0.7 ? "failed" : "passed",
        duration: "0.32s",
        error:
          "Contract was expected to revert with 'Not enough tokens', but didn't revert.",
      },
      {
        id: 5,
        name: "Should update balances after transfers",
        status: "passed",
        duration: "0.38s",
      },
    ],
    gasUsage: [
      { function: "transfer", cost: 48325, improvement: "+12%" },
      { function: "approve", cost: 32750, improvement: "+5%" },
      { function: "transferFrom", cost: 53420, improvement: "-3%" },
    ],
  };
}
