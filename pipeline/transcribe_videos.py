import whisper
import argparse
import os
import sys

# ensure stdout/stderr handle non-ASCII filenames on Windows
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr.encoding and sys.stderr.encoding.lower() != "utf-8":
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

VIDEO_EXTENSIONS = {".mp4", ".mkv", ".webm", ".avi", ".mov", ".m4v"}


def find_videos(folder: str) -> list[str]:
    videos = []
    for root, _, files in os.walk(folder):
        for f in files:
            if os.path.splitext(f)[1].lower() in VIDEO_EXTENSIONS:
                videos.append(os.path.join(root, f))
    return sorted(videos)


def transcribe(folder: str, model_name: str, output_format: str):
    videos = find_videos(folder)
    if not videos:
        print(f"No video files found in {folder}")
        return

    print(f"Found {len(videos)} video(s). Loading Whisper model '{model_name}'...")
    model = whisper.load_model(model_name)
    print("Model loaded.\n")

    for i, video_path in enumerate(videos, 1):
        base = os.path.splitext(video_path)[0]
        out_path = base + f".{output_format}"

        if os.path.exists(out_path):
            print(f"[{i}/{len(videos)}] Skipping (already transcribed): {os.path.basename(video_path)}")
            continue

        print(f"[{i}/{len(videos)}] Transcribing: {os.path.basename(video_path)}")
        result = model.transcribe(video_path, verbose=False)

        if output_format == "txt":
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(result["text"].strip())
        elif output_format == "srt":
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(segments_to_srt(result["segments"]))
        elif output_format == "vtt":
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(segments_to_vtt(result["segments"]))

        print(f"    Saved: {out_path}\n")

    print("Done.")


def fmt_time_srt(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def fmt_time_vtt(seconds: float) -> str:
    return fmt_time_srt(seconds).replace(",", ".")


def segments_to_srt(segments) -> str:
    lines = []
    for i, seg in enumerate(segments, 1):
        lines.append(str(i))
        lines.append(f"{fmt_time_srt(seg['start'])} --> {fmt_time_srt(seg['end'])}")
        lines.append(seg["text"].strip())
        lines.append("")
    return "\n".join(lines)


def segments_to_vtt(segments) -> str:
    lines = ["WEBVTT", ""]
    for seg in segments:
        lines.append(f"{fmt_time_vtt(seg['start'])} --> {fmt_time_vtt(seg['end'])}")
        lines.append(seg["text"].strip())
        lines.append("")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Transcribe all videos in a folder using Whisper")
    parser.add_argument("folder", help="Path to the folder containing videos")
    parser.add_argument(
        "-m", "--model",
        default="base",
        choices=["tiny", "base", "small", "medium", "large"],
        help="Whisper model size (default: base). Larger = more accurate but slower.",
    )
    parser.add_argument(
        "-f", "--format",
        default="txt",
        choices=["txt", "srt", "vtt"],
        help="Output format (default: txt)",
    )
    args = parser.parse_args()

    transcribe(args.folder, args.model, args.format)


if __name__ == "__main__":
    main()
