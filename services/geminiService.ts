import { GoogleGenAI, Type } from "@google/genai";
import { User, Workout } from '../types';
import { TRAINER_PERSONAS } from '../constants';

// Helper to get the AI client, throwing a clear error if key is missing
const getAiClient = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is missing. Please set GEMINI_API_KEY in your .env file.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateWorkoutPlan = async (user: User, trainerPersona?: string): Promise<Workout[]> => {
  // FIX: Removed redundant API key check as per guidelines, which assume the key is always available.

  // Find the trainer persona details
  const trainer = TRAINER_PERSONAS.find(t => t.id === (trainerPersona || user.selectedTrainer)) || TRAINER_PERSONAS[0];

  const prompt = `
    ${trainer.promptModifier}
    
    A user with the following profile needs a new, challenging, one-day workout plan.
    - Goal: ${user.goal}
    - Gender: ${user.gender}
    - Experience Level (based on progress): ${user.progress > 50 ? 'Advanced' : 'Intermediate'}
    - Current Weight: ${user.currentWeight} kg
    
    Generate a list of 5 exercises tailored to their goal.
  `;

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            workouts: {
              type: Type.ARRAY,
              description: "A list of 5 workout exercises.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "Name of the exercise."
                  },
                  sets: {
                    type: Type.INTEGER,
                    description: "Number of sets to perform."
                  },
                  reps: {
                    type: Type.STRING,
                    description: "Number of repetitions or duration (e.g., '10-12' or '60s')."
                  }
                },
                required: ["name", "sets", "reps"],
              }
            }
          },
          required: ["workouts"],
        },
      },
    });

    const jsonResponse = JSON.parse(response.text);

    if (jsonResponse.workouts && Array.isArray(jsonResponse.workouts)) {
      return jsonResponse.workouts.map((w: any, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        name: w.name,
        sets: w.sets,
        reps: w.reps,
        completed: false,
      }));
    } else {
      throw new Error("Invalid format from AI response.");
    }
  } catch (error) {
    console.error("Error generating workout plan:", error);
    throw new Error("Failed to generate AI workout. Please try again later.");
  }
};

export const generateAvatarFromPhoto = async (photoBase64: string): Promise<any> => {
  const prompt = `
    Analyze this image of a person and extract physical traits to generate a pixel art avatar.
    Return a JSON object with the following properties:
    - gender: 'Male', 'Female', or 'Other'
    - hairColor: hex code (e.g., #000000)
    - skinColor: hex code (e.g., #f5d0b0)
    - hasGlasses: boolean
    - hasBeard: boolean
    - hairStyle: 'short', 'long', 'bald', 'curly'
    
    Be creative but accurate to the image.
  `;

  try {
    // Remove header if present (e.g., "data:image/jpeg;base64,")
    const base64Data = photoBase64.split(',')[1] || photoBase64;

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { text: prompt },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data
          }
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    const jsonResponse = JSON.parse(response.text);

    // Map traits to DiceBear seed or configuration
    // For simplicity in this demo, we'll generate a seed based on traits
    const seed = `${jsonResponse.gender}-${jsonResponse.hairStyle}-${jsonResponse.hairColor}-${jsonResponse.hasGlasses ? 'glasses' : ''}`;

    return {
      avatarId: seed, // In a real app, we'd map this to specific DiceBear options
      traits: jsonResponse
    };

  } catch (error) {
    console.error("Error generating avatar:", error);
    throw new Error("Failed to analyze photo.");
  }
};
