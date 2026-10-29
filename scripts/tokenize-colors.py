"""One-time migration of hardcoded JSX Tailwind color utilities to theme tokens.
The script intentionally leaves opacity modifiers untouched and images unchanged."""
import colorsys,re
from pathlib import Path
# Replaces Tailwind arbitrary color utilities, not arbitrary gradients/shadows nor in prose.
pattern=re.compile(r'(?P<kind>(?:[a-z]+:)*(?:bg|text|border|from|via|to|ring|divide|fill|stroke))-\[#(?P<hex>[0-9a-fA-F]{6})\](?!/)')

def token(h,kind):
 rgb=[int(h[i:i+2],16)/255 for i in (0,2,4)]
 hue,light,sat=colorsys.rgb_to_hls(*rgb)
 group=kind.split(':')[-1]
 if group in ['fill','stroke','ring','divide']:return 'theme-primary' if light <.8 else 'theme-border'
 if group=='border':
  if light>.72:return 'theme-border'
  if .52<light<=.72:return 'theme-primary'
  return 'theme-primary'
 if group in ['from','via','to','bg']:
  if light<.29:return 'theme-dark'
  if light>.78:return 'theme-tint'
  if sat<.14:return 'theme-surface' if light>.62 else 'theme-ink'
  if hue>.72 and hue<.95:return 'theme-alt'
  if (hue<.13 or hue>.94) and sat>.19:return 'theme-accent'
  if .13<hue<.20 and sat>.19:return 'theme-accent'
  return 'theme-primary'
 if group=='text':
  if light<.36:return 'theme-ink'
  if light>.72:
   if sat>.10:return 'theme-accent-light'
   return 'theme-white'
  if sat<.10:return 'theme-ink'
  if .71<hue<.96:return 'theme-alt'
  if hue<.17 or hue>.96:return 'theme-accent'
  return 'theme-primary'
 return 'theme-primary'

count=0
for p in list(Path('src/components').rglob('*.jsx'))+list(Path('src/app').rglob('*.jsx')):
 s=p.read_text()
 def do(m):
  global count
  count+=1
  return f"{m.group('kind')}-[var(--{token(m.group('hex'),m.group('kind'))})]"
 t=pattern.sub(do,s)
 if t!=s:p.write_text(t)
print('Converted',count,'JSX color utilities to dynamic CSS variables')
