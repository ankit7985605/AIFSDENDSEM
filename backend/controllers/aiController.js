// Using native fetch for OpenRouter API call

const analyzeComplaint = async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ message: 'Description is required for AI analysis' });
        }

        const prompt = `
            Analyze the following complaint description and provide:
            1. Priority (High, Medium, Low)
            2. Department (e.g., Water Department, Electricity Board, Road & Transport, Public Health, etc.)
            3. Summary (A short 1-line summary)
            4. Auto-response (A polite 1-sentence auto-response to the citizen)

            Complaint: "${description}"

            Respond ONLY in the following JSON format without any extra markdown:
            {
                "priority": "High/Medium/Low",
                "department": "Suggested Department",
                "summary": "Short summary",
                "autoResponse": "Auto response text"
            }
        `;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                // Optional headers for OpenRouter
                'HTTP-Referer': 'http://localhost:5000', 
                'X-Title': 'Complaint Management System' 
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo', // You can change this to a free model like 'google/gemma-7b-it:free' or 'huggingfaceh4/zephyr-7b-beta:free' if you prefer, but openrouter maps openai requests properly. Let's use standard openai/gpt-3.5-turbo which is cheap and fast, or meta-llama/llama-3-8b-instruct:free
                messages: [
                    { role: 'system', content: 'You are an AI assistant for a Smart Complaint Management System.' },
                    { role: 'user', content: prompt }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`OpenRouter API error: ${errorData}`);
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        // Parse JSON output and clean markdown blocks if AI adds them
        let parsedResult;
        try {
            const cleanMessage = aiMessage.replace(/```json/g, '').replace(/```/g, '').trim();
            parsedResult = JSON.parse(cleanMessage);
        } catch (e) {
            // Fallback if AI didn't return strict JSON
            throw new Error("AI returned malformed JSON");
        }

        res.status(200).json(parsedResult);
    } catch (error) {
        console.error("AI Analysis Error:", error);
        res.status(500).json({ message: error.message || 'Failed to analyze complaint' });
    }
};

module.exports = { analyzeComplaint };
