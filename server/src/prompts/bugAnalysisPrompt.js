const buildBugAnalysisPrompt = (bug) => {
    return `
You are an experienced software engineer performing bug analysis.

Analyze the following software bug and return a structured JSON response.

BUG INFORMATION:

Title:
${bug.title}

Description:
${bug.description}

Priority:
${bug.priority}

Severity:
${bug.severity}

Status:
${bug.status}

Labels:
${(bug.labels || []).join(", ")}

Environment:
Browser: ${bug.environment?.browser || "Not provided"}
Operating System: ${bug.environment?.operatingSystem ||
        "Not provided"
        }
App Version: ${bug.environment?.appVersion ||
        "Not provided"
        }

Reproduction Steps:
${(bug.reproductionSteps || [])
            .map(
                (step, index) =>
                    `${index + 1}. ${step}`
            )
            .join("\n") || "Not provided"
        }

Expected Result:
${bug.expectedResult || "Not provided"}

Actual Result:
${bug.actualResult || "Not provided"}

Return ONLY valid JSON using exactly this structure:

{
    "rootCause": "Most likely technical root cause",
    "suggestedFix": "Recommended technical fix",
    "confidence": 0,
    "estimatedComplexity": "Low"
}

Rules:

- rootCause must be a concise technical explanation.
- suggestedFix must contain a practical engineering recommendation.
- confidence must be an integer from 0 to 100.
- estimatedComplexity must be exactly one of:
  "Low", "Medium", "High".
- Do not include Markdown.
- Do not include code fences.
- Do not add any additional fields.
- If the information is insufficient to determine the root cause, clearly say that it cannot be determined with the available information and lower the confidence score.
`;
};

export default buildBugAnalysisPrompt;