import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Generate a procedural video using Canvas API rendered server-side
  // This creates an MP4 video showing the described scene with animation

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; overflow: hidden; background: #000; }
    canvas { display: block; }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1920;
    canvas.height = 1080;

    let frame = 0;
    const totalFrames = 600; // 20 seconds at 30fps

    function drawScene() {
      // Sky gradient (early morning)
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6);
      skyGradient.addColorStop(0, '#87CEEB');
      skyGradient.addColorStop(0.5, '#FFE4B5');
      skyGradient.addColorStop(1, '#FFA07A');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);

      // Ground
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

      // Grass
      ctx.fillStyle = '#567D46';
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.15);

      // Fog layers (animated)
      const fogOffset = (frame % 200) / 200;
      for (let i = 0; i < 5; i++) {
        const fogGradient = ctx.createRadialGradient(
          canvas.width * (0.2 + i * 0.2 + fogOffset * 0.1),
          canvas.height * 0.5,
          100,
          canvas.width * (0.2 + i * 0.2 + fogOffset * 0.1),
          canvas.height * 0.5,
          400
        );
        fogGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        fogGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = fogGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Date palm trees (background)
      for (let i = 0; i < 8; i++) {
        const treeX = canvas.width * (0.1 + i * 0.12) - (frame * 2);
        const treeY = canvas.height * 0.55;
        drawPalmTree(treeX, treeY, 0.8);
      }

      // Dirt path
      ctx.fillStyle = '#A0826D';
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.3, canvas.height);
      ctx.lineTo(canvas.width * 0.4, canvas.height * 0.6);
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.6);
      ctx.lineTo(canvas.width * 0.7, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Man walking (animated)
      const manX = canvas.width * 0.45;
      const manY = canvas.height * 0.65;
      const walkCycle = Math.sin(frame * 0.2);
      drawMan(manX, manY, walkCycle);

      // Foreground palm trees
      drawPalmTree(canvas.width * 0.15, canvas.height * 0.65, 1.2);
      drawPalmTree(canvas.width * 0.85, canvas.height * 0.65, 1.2);

      // Fog overlay (foreground)
      const fogOverlay = ctx.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height);
      fogOverlay.addColorStop(0, 'rgba(255, 255, 255, 0)');
      fogOverlay.addColorStop(1, 'rgba(255, 255, 255, 0.6)');
      ctx.fillStyle = fogOverlay;
      ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);

      // Text overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('বাংলাদেশী শীতের সকাল', canvas.width / 2, 80);
      ctx.font = '32px Arial';
      ctx.fillText('Bangladeshi Winter Morning', canvas.width / 2, 130);
    }

    function drawPalmTree(x, y, scale) {
      // Trunk
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(x - 8 * scale, y, 16 * scale, 100 * scale);

      // Fronds
      ctx.fillStyle = '#2D5016';
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, -40 * scale, 15 * scale, 50 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawMan(x, y, walkCycle) {
      // Head
      ctx.fillStyle = '#8D5524';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Body (wrapped in shawl)
      ctx.fillStyle = '#F5F5DC';
      ctx.fillRect(x - 25, y + 20, 50, 60);

      // Lungi (traditional cloth)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x - 25, y + 80, 50, 50);

      // Arms
      ctx.strokeStyle = '#F5F5DC';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(x - 25, y + 30);
      ctx.lineTo(x - 40, y + 60 + walkCycle * 5);
      ctx.stroke();

      // Clay pot in hand
      ctx.fillStyle = '#CD853F';
      ctx.beginPath();
      ctx.arc(x - 50, y + 65 + walkCycle * 5, 15, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x + 25, y + 30);
      ctx.lineTo(x + 35, y + 60 - walkCycle * 5);
      ctx.stroke();

      // Legs (walking animation)
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(x - 10, y + 130);
      ctx.lineTo(x - 15, y + 180 + walkCycle * 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + 10, y + 130);
      ctx.lineTo(x + 15, y + 180 - walkCycle * 10);
      ctx.stroke();
    }

    function animate() {
      drawScene();
      frame++;

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  </script>
</body>
</html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
