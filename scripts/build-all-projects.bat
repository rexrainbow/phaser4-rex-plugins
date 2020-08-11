@echo off
cd ..
set preview=0
set main=./examples/bbcodetext/bbcodetext.ts
start /b npm run build-project
set main=./examples/bbcodetext/scroll-text.ts
start /b npm run build-project
set main=./examples/board-fieldofview/fov.ts
start /b npm run build-project
set main=./examples/board-hexagonmap/hexagon.ts
start /b npm run build-project
set main=./examples/board-match/line-match.ts
start /b npm run build-project
set main=./examples/board-pathfinder/find-path.ts
start /b npm run build-project
set main=./examples/canvas/fill.ts
start /b npm run build-project
set main=./examples/canvas-texture/circle.ts
start /b npm run build-project
set main=./examples/test/sample.ts
start /b npm run build-project