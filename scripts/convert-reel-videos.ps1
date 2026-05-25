# Compress .mov reels to web-friendly H.264 MP4 (run after adding new source files).
# Requires: ffmpeg (winget install Gyan.FFmpeg)
$ErrorActionPreference = "Stop"
$dir = Join-Path $PSScriptRoot ".." "public" "video-markit"
Set-Location $dir

Get-ChildItem -Filter "*.mov" | ForEach-Object {
  $out = [System.IO.Path]::ChangeExtension($_.Name, ".mp4")
  $w = if ($_.Length -gt 100MB) { 540 } else { 720 }
  $crf = if ($_.Length -gt 100MB) { 32 } elseif ($_.Length -gt 50MB) { 30 } else { 28 }
  $vf = "scale=${w}:-2:flags=lanczos"
  Write-Host "→ $out ($w px, crf $crf)"
  ffmpeg -y -hide_banner -loglevel error -i $_.FullName -vf $vf `
    -c:v libx264 -profile:v main -pix_fmt yuv420p -crf $crf -preset medium `
    -movflags +faststart -an $out
}

Write-Host "Done. Commit the .mp4 files only (not .mov)."
