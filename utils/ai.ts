import { OpenAI } from '@langchain/openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import z from 'zod';
import { PromptTemplate } from '@langchain/core/prompts';
import { Document } from 'langchain/document';
import { JournalEntry } from '@prisma/client';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
    mood: z.string().describe('the mood of the person who wrote the entry'),
    summary: z.string().describe('a summary of the entry'),
    negative: z.boolean().describe('is the journal entry is negative, i.e. does it contain negative emotions'),
    subject: z.string().describe('the subject of the journal entry'),
    color: z
      .string()
      .describe(
        'a hexadecimal color to represent the mood of the entry, for example #0101fe to represent blue as happiness'
      ),
  })
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format your response to match the format instructions. no matter what! \n {format_instructions} \n {entry}`,
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({ entry: content });
  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const chatModel = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
  });

  const result = await chatModel.invoke(input);

  try {
    return parser.parse(result);
  } catch (error) {
    console.error('Error parsing response', error);
    return null;
  }
};

export const qa = async (question: string, entries: Pick<JournalEntry, 'createdAt' | 'content' | 'id'>[]) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { source: entry.id, createdAt: entry.createdAt },
    });
  });

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const embeddings = new OpenAIEmbeddings();
  const chain = loadQARefineChain(model);
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const res = await chain.invoke({ input_documents: relevantDocs, question });

  return res.output_text;
};
