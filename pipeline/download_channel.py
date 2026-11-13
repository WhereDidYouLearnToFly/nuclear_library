import yt_dlp
import os
import argparse
import shutil
import sys

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr.encoding and sys.stderr.encoding.lower() != "utf-8":
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


def progress_hook(d):
    if d["status"] == "finished":
        print(f"\nDone: {os.path.basename(d['filename'])}")
    elif d["status"] == "downloading":
        pct = d.get("_percent_str", "?%").strip()
        speed = d.get("_speed_str", "?").strip()
        eta = d.get("_eta_str", "?").strip()
        print(f"\r  {pct}  speed: {speed}  ETA: {eta}    ", end="", flush=True)


def find_ffmpeg() -> str | None:
    path = shutil.which("ffmpeg")
    if path:
        return os.path.dirname(path)
    return None


def download_channel(url: str, output_dir: str, resolution: str, audio_only: bool):
    os.makedirs(output_dir, exist_ok=True)

    ffmpeg_dir = find_ffmpeg()
    if not ffmpeg_dir:
        print("WARNING: ffmpeg not found in PATH. Video and audio streams will not be merged.", file=sys.stderr)

    if audio_only:
        format_spec = "bestaudio/best"
        postprocessors = [{"key": "FFmpegExtractAudio", "preferredcodec": "mp3"}]
    else:
        format_spec = f"bestvideo[height<={resolution}]+bestaudio/best[height<={resolution}]"
        postprocessors = []

    outtmpl = os.path.join(output_dir, "%(uploader)s", "%(upload_date)s - %(title)s.%(ext)s")

    ydl_opts = {
        "format": format_spec,
        "outtmpl": outtmpl,
        "postprocessors": postprocessors,
        "ignoreerrors": True,
        "download_archive": os.path.join(output_dir, "downloaded.txt"),
        "progress_hooks": [progress_hook],
        **({"ffmpeg_location": ffmpeg_dir} if ffmpeg_dir else {}),
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


def main():
    parser = argparse.ArgumentParser(description="Download all videos from a YouTube channel")
    parser.add_argument("url", help="Channel URL, e.g. https://www.youtube.com/@ChannelName")
    parser.add_argument("-o", "--output", default="downloads", help="Output directory (default: downloads)")
    parser.add_argument("-r", "--resolution", default="1080", help="Max resolution in px (default: 1080)")
    parser.add_argument("--audio-only", action="store_true", help="Download audio only as MP3")
    args = parser.parse_args()

    print(f"Channel : {args.url}")
    print(f"Output  : {os.path.abspath(args.output)}")
    print(f"Mode    : {'audio only (MP3)' if args.audio_only else f'video up to {args.resolution}p'}")
    print()

    download_channel(args.url, args.output, args.resolution, args.audio_only)


if __name__ == "__main__":
    main()
