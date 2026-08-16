import { GoogleGenAI } from "@google/genai";
import buildBugAnalysisPrompt from "../prompts/bugAnalysisPrompt.js";
import ApiError from "../utils/ApiError.js";
import "dotenv/config";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
        apiVersion: "v1",
    },
});

const generateBugAnalysis = async (bug) => {
    const prompt = buildBugAnalysisPrompt(bug);

    try {
        const interaction = await ai.interactions.create({
            model: "gemini-3.6-flash",
            input: prompt,
            response_format: {
                type: "text",
                mime_type: "application/json",
                schema: {
                    type: "object",

                    properties: {
                        rootCause: {
                            type: "string",
                        },

                        suggestedFix: {
                            type: "string",
                        },

                        confidence: {
                            type: "integer",
                            minimum: 0,
                            maximum: 100,
                        },

                        estimatedComplexity: {
                            type: "string",
                            enum: [
                                "Easy",
                                "Medium",
                                "Hard",
                            ],
                        },
                    },

                    required: [
                        "rootCause",
                        "suggestedFix",
                        "confidence",
                        "estimatedComplexity",
                    ],
                },
            },
        });

        const rawResponse =
            interaction.output_text?.trim();

        if (!rawResponse) {
            throw new ApiError(
                502,
                "AI returned an empty response."
            );
        }

        let analysis;

        try {
            analysis = JSON.parse(rawResponse);
        } catch (error) {
            throw new ApiError(
                502,
                "AI returned an invalid JSON response."
            );
        }

        if (
            typeof analysis.rootCause !== "string" ||
            typeof analysis.suggestedFix !== "string" ||
            !Number.isInteger(analysis.confidence) ||
            ![
                "Easy",
                "Medium",
                "Hard",
            ].includes(
                analysis.estimatedComplexity
            )
        ) {
            throw new ApiError(
                502,
                "AI returned an invalid analysis format."
            );
        }

        if (
            analysis.confidence < 0 ||
            analysis.confidence > 100
        ) {
            throw new ApiError(
                502,
                "AI returned an invalid confidence score."
            );
        }

        return analysis;
    } catch (error) {
        console.error(
            "Gemini API error:",
            error.message
        );

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            502,
            "AI analysis failed."
        );
    }
};

export {
    generateBugAnalysis,
};