from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

MODEL_NAME = "sshleifer/distilbart-cnn-6-6"

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME, low_cpu_mem_usage=True)
    model.eval()
    has_model = True
except Exception as e:
    print(f"Warning: Failed to load BART model ({e}). Using mock/fallback summarizer.")
    has_model = False

def summarize_text(text: str):
    if has_model:
        try:
            inputs = tokenizer(
                text,
                return_tensors="pt",
                max_length=1024,
                truncation=True
            )

            with torch.no_grad():
                summary_ids = model.generate(
                    inputs["input_ids"],
                    max_length=120,
                    min_length=30,
                    num_beams=4,
                    early_stopping=True
                )

            summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
            return summary
        except Exception as e:
            print(f"Error during summarization inference: {e}")

    # Fallback: Simple extractive summarizer (first 3 sentences or first 300 chars)
    import re
    sentences = re.split(r'(?<=[.!?])\s+', text)
    fallback_summary = " ".join(sentences[:3])
    if len(fallback_summary) > 300:
        fallback_summary = fallback_summary[:300] + "..."
    return f"[AI Fallback Summary] {fallback_summary}"