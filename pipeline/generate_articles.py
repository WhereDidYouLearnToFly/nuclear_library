import sys
import os
import argparse
import ollama

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr.encoding and sys.stderr.encoding.lower() != "utf-8":
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

LANGUAGES = {
    "en": "English",
    "fr": "French",
    "ua": "Ukrainian",
    "ru": "Russian",
}

PROMPT_TEMPLATE = """You are a professional science writer. Below is a raw transcription of a YouTube video about nuclear physics, nuclear weapons, or nuclear accidents.

Your task:
1. Read and understand the transcription (it may be in any language)
2. Write a well-structured informative article in {language}
3. The article must have: a compelling title, introduction, several sections with headings, and a conclusion
4. Use clear, engaging language suitable for a general educated audience
5. Do NOT mention that this is based on a video or transcription — write it as an original article
6. Output only the article text in Markdown format, nothing else

Transcription:
{transcription}
"""


def find_transcripts(folder: str) -> list[str]:
    txts = []
    for root, _, files in os.walk(folder):
        for f in files:
            if f.endswith(".txt"):
                txts.append(os.path.join(root, f))
    return sorted(txts)


def generate_article(transcription: str, lang_code: str, model: str) -> str:
    prompt = PROMPT_TEMPLATE.format(
        language=LANGUAGES[lang_code],
        transcription=transcription,
    )
    response = ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.message.content.strip()


def process(folder: str, output_dir: str, model: str, languages: list[str]):
    transcripts = find_transcripts(folder)
    if not transcripts:
        print(f"No .txt files found in {folder}")
        return

    print(f"Found {len(transcripts)} transcript(s). Model: {model}\n")

    for i, txt_path in enumerate(transcripts, 1):
        base_name = os.path.splitext(os.path.basename(txt_path))[0]
        print(f"[{i}/{len(transcripts)}] {base_name}")

        transcription = open(txt_path, encoding="utf-8").read().strip()
        if not transcription:
            print("  Skipping — empty transcript\n")
            continue

        for lang in languages:
            out_path = os.path.join(output_dir, lang, base_name + ".md")
            if os.path.exists(out_path):
                print(f"  [{lang}] Already exists, skipping")
                continue

            print(f"  [{lang}] Generating...", end=" ", flush=True)
            try:
                article = generate_article(transcription, lang, model)
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                with open(out_path, "w", encoding="utf-8") as f:
                    f.write(article)
                print("done")
            except Exception as e:
                print(f"ERROR: {e}")

        print()

    print("All done.")


def main():
    parser = argparse.ArgumentParser(description="Generate multilingual articles from video transcriptions using Ollama")
    parser.add_argument("folder", help="Folder containing .txt transcription files")
    parser.add_argument("-o", "--output", default="articles", help="Output directory (default: articles)")
    parser.add_argument("-m", "--model", default="gemma4:latest", help="Ollama model (default: gemma4:latest)")
    parser.add_argument(
        "-l", "--languages",
        nargs="+",
        default=list(LANGUAGES.keys()),
        choices=list(LANGUAGES.keys()),
        help="Languages to generate (default: all — en fr ua ru)",
    )
    args = parser.parse_args()

    print(f"Transcripts : {args.folder}")
    print(f"Output      : {os.path.abspath(args.output)}")
    print(f"Model       : {args.model}")
    print(f"Languages   : {', '.join(args.languages)}\n")

    process(args.folder, args.output, args.model, args.languages)


if __name__ == "__main__":
    main()
