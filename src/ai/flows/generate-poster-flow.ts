
'use server';
/**
 * @fileOverview A flow for generating movie posters.
 *
 * - generatePoster - A function that generates a movie poster from a text prompt.
 * - GeneratePosterInput - The input type for the generatePoster function.
 * - GeneratePosterOutput - The return type for the generatePoster function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePosterInputSchema = z.object({
  prompt: z.string().describe('A text description of the movie poster to generate.'),
});
export type GeneratePosterInput = z.infer<typeof GeneratePosterInputSchema>;

const GeneratePosterOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated poster image.'),
});
export type GeneratePosterOutput = z.infer<typeof GeneratePosterOutputSchema>;

export async function generatePoster(input: GeneratePosterInput): Promise<GeneratePosterOutput> {
  return generatePosterFlow(input);
}

const generatePosterFlow = ai.defineFlow(
  {
    name: 'generatePosterFlow',
    inputSchema: GeneratePosterInputSchema,
    outputSchema: GeneratePosterOutputSchema,
  },
  async ({ prompt }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Create a cinematic movie poster. The poster should be visually striking and suitable for a feature film. Do not include any text, titles, or credits. The concept is: ${prompt}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        aspectRatio: '2:3',
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return a valid URL.');
    }
    
    return { imageUrl: media.url };
  }
);
