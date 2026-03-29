import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const diagrams = [
  { name: 'engine-exploded', prompt: 'A clean, flat vector illustration of a car engine exploded view, technical diagram style, white background, no text' },
  { name: 'cooling-system', prompt: 'A clean, flat vector illustration of a car engine cooling system with radiator and pipes, technical diagram style, white background, no text' },
  { name: 'car-chassis', prompt: 'A clean, flat vector illustration of a car chassis with wheels, engine, and suspension, technical diagram style, white background, no text' },
  { name: 'clutch-gearbox', prompt: 'A clean, flat vector illustration of a car manual transmission and clutch, technical diagram style, white background, no text' },
  { name: 'differential', prompt: 'A clean, flat vector illustration of a car differential and drive axle, technical diagram style, white background, no text' },
  { name: 'wheel-tire', prompt: 'A clean, flat vector illustration of a car wheel and tire cross section, technical diagram style, white background, no text' },
  { name: 'suspension', prompt: 'A clean, flat vector illustration of a car suspension system with shock absorber and spring, technical diagram style, white background, no text' },
  { name: 'steering', prompt: 'A clean, flat vector illustration of a rack and pinion steering system, technical diagram style, white background, no text' },
  { name: 'power-steering', prompt: 'A clean, flat vector illustration of a hydraulic power steering system, technical diagram style, white background, no text' },
  { name: 'disc-brake', prompt: 'A clean, flat vector illustration of a car disc brake system with caliper and rotor, technical diagram style, white background, no text' },
  { name: 'air-brake', prompt: 'A clean, flat vector illustration of a pneumatic air brake system for trucks, technical diagram style, white background, no text' }
];

async function generateAll() {
  if (!fs.existsSync('./public/diagrams')) {
    fs.mkdirSync('./public/diagrams', { recursive: true });
  }
  for (const d of diagrams) {
    console.log(`Generating ${d.name}...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: d.prompt,
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        }
      });
      
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(`./public/diagrams/${d.name}.png`, buffer);
          console.log(`Saved ${d.name}.png`);
          break;
        }
      }
    } catch (e: any) {
      console.error(`Failed to generate ${d.name}:`, e.message);
    }
  }
}

generateAll();
