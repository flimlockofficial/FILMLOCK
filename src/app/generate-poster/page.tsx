
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePoster } from '@/ai/flows/generate-poster-flow';
import Image from 'next/image';
import { Loader2, Wand2 } from 'lucide-react';
import { toast } from "sonner";

export default function GeneratePosterPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setImageUrl('');

    try {
      const result = await generatePoster({ prompt });
      if (result.imageUrl) {
        setImageUrl(result.imageUrl);
      } else {
        toast.error("Image generation failed", {
          description: "The AI could not generate a poster for this prompt. Please try a different one.",
        });
      }
    } catch (error) {
      console.error('Error generating poster:', error);
      toast.error("An unexpected error occurred.", {
        description: "Please check the console for more details.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-2xl py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 />
              AI Movie Poster Generator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-muted-foreground">
                Describe the movie you want a poster for. Be as creative as you want!
              </p>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A lone astronaut stranded on a vibrant, alien planet."
                disabled={loading}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Poster
                  </>
                )}
              </Button>
            </form>
            {loading && (
              <div className="mt-8 flex justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-16 h-16 animate-spin" />
                  <p>The AI is creating your masterpiece... this can take a moment.</p>
                </div>
              </div>
            )}
            {imageUrl && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Generated Poster:</h3>
                <div className="aspect-w-2 aspect-h-3 rounded-lg overflow-hidden border">
                  <Image src={imageUrl} alt="Generated movie poster" width={500} height={750} className="w-full h-full object-cover" />
                </div>
                 <Button onClick={() => navigator.clipboard.writeText(imageUrl)} className="mt-4 w-full">
                    Copy Image URL
                 </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
