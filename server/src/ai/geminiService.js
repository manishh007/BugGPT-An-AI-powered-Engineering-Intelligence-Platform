import { GoogleGenAI } from "@google/genai";

import buildBugAnalysisPrompt from "../prompts/bugAnalysisPrompt.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateBugAnalysis = async (bug) => {
    const prompt = buildBugAnalysisPrompt(bug);

    const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: prompt,
    });

    return interaction.output_text;
};

export {
    generateBugAnalysis,
};