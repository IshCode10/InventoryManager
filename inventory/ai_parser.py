import os
import json
import re
from anthropic import Anthropic

client = Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY'))

def parse_waste_text(text):
    response = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=300,
        messages=[
            {
                "role": "user",
                "content": (
                    "Extract structured waste-log data from this text. "
                    "Respond with ONLY a JSON object, no other text, in this exact format: "
                    '{"item_name": "...", "quantity": number, "unit": "...", "reason": "..."}\n\n'
                    f"Text: {text}"
                )
            }
        ]
    )
    raw_text = response.content[0].text.strip()

    match = re.search(r'\{.*\}', raw_text, re.DOTALL)
    if not match:
        raise ValueError(f"Could not find JSON in Claude's response: {raw_text}")

    return json.loads(match.group(0))