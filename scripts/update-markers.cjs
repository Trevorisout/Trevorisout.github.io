const fs = require('fs');

let content = fs.readFileSync('src/data/lessons.ts', 'utf8');

// 1. Engine Structure
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 20, y: 20 \},\s*\{ id: '2', x: 30, y: 20 \},\s*\{ id: '3', x: 40, y: 20 \},\s*\{ id: '4', x: 50, y: 20 \},\s*\{ id: '5', x: 60, y: 20 \},\s*\{ id: '6', x: 70, y: 20 \},\s*\{ id: '7', x: 80, y: 20 \},\s*\{ id: '8', x: 90, y: 20 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 50, y: 62.5 }, { id: '2', x: 50, y: 28.75 }, { id: '3', x: 50, y: 52.5 }, { id: '4', x: 50, y: 67.5 },
          { id: '5', x: 50, y: 77.5 }, { id: '6', x: 50, y: 25 }, { id: '7', x: 50, y: 12.5 }, { id: '8', x: 50, y: 92.5 }
        ]`
);

// 2. Cooling System
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 20, y: 30 \}, \{ id: '2', x: 30, y: 30 \}, \{ id: '3', x: 40, y: 30 \}, \{ id: '4', x: 50, y: 30 \},\s*\{ id: '5', x: 60, y: 30 \}, \{ id: '6', x: 70, y: 30 \}, \{ id: '7', x: 20, y: 60 \}, \{ id: '8', x: 30, y: 60 \},\s*\{ id: '9', x: 40, y: 60 \}, \{ id: '10', x: 50, y: 60 \}, \{ id: '11', x: 60, y: 60 \}, \{ id: '12', x: 70, y: 60 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 75, y: 50 }, { id: '2', x: 75, y: 30 }, { id: '3', x: 42.5, y: 32.5 }, { id: '4', x: 59.3, y: 35 },
          { id: '5', x: 17.5, y: 25 }, { id: '6', x: 17.5, y: 50 }, { id: '7', x: 27.5, y: 50 }, { id: '8', x: 42.5, y: 67.5 },
          { id: '9', x: 59.3, y: 45 }, { id: '10', x: 56.25, y: 65 }, { id: '11', x: 60, y: 65 }, { id: '12', x: 68.75, y: 65 }
        ]`
);

// 3. Differential
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 20, y: 50 \}, \{ id: '2', x: 40, y: 50 \}, \{ id: '3', x: 60, y: 50 \},\s*\{ id: '4', x: 80, y: 50 \}, \{ id: '5', x: 50, y: 70 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 46.8, y: 50 }, { id: '2', x: 53.75, y: 25 }, { id: '3', x: 62.5, y: 35 },
          { id: '4', x: 62.5, y: 50 }, { id: '5', x: 62.5, y: 40 }, { id: '6', x: 60, y: 50 }, { id: '7', x: 75, y: 50 }
        ]`
);

// 4. Wheel
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 30, y: 50 \}, \{ id: '2', x: 50, y: 50 \}, \{ id: '3', x: 70, y: 50 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 50, y: 20 }, { id: '2', x: 50, y: 35 }, { id: '3', x: 50, y: 50 }, { id: '4', x: 57.5, y: 33.75 }
        ]`
);

// 5. Suspension
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 30, y: 50 \}, \{ id: '2', x: 50, y: 50 \}, \{ id: '3', x: 70, y: 50 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 48.1, y: 50 }, { id: '2', x: 50, y: 35 }, { id: '3', x: 37.5, y: 77.5 }, { id: '4', x: 25, y: 80 }, { id: '5', x: 50, y: 16.25 }
        ]`
);

// 6. Steering
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 20, y: 50 \}, \{ id: '2', x: 40, y: 50 \}, \{ id: '3', x: 60, y: 50 \},\s*\{ id: '4', x: 80, y: 50 \}, \{ id: '5', x: 50, y: 70 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 25, y: 25 }, { id: '2', x: 40.6, y: 37.5 }, { id: '3', x: 50, y: 50 },
          { id: '4', x: 50, y: 60 }, { id: '5', x: 25, y: 60 }, { id: '6', x: 17.5, y: 60 }
        ]`
);

// 7. Power Steering
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 20, y: 50 \}, \{ id: '2', x: 30, y: 50 \}, \{ id: '3', x: 40, y: 50 \},\s*\{ id: '4', x: 50, y: 50 \}, \{ id: '5', x: 60, y: 50 \}, \{ id: '6', x: 70, y: 50 \}, \{ id: '7', x: 80, y: 50 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 25, y: 25 }, { id: '2', x: 40.6, y: 37.5 }, { id: '3', x: 50, y: 25 },
          { id: '4', x: 50, y: 50 }, { id: '5', x: 50, y: 60 }, { id: '6', x: 62.5, y: 25 }
        ]`
);

// 8. Hydraulic Brake
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 20, y: 30 \}, \{ id: '2', x: 30, y: 30 \}, \{ id: '3', x: 40, y: 30 \}, \{ id: '4', x: 50, y: 30 \},\s*\{ id: '5', x: 60, y: 30 \}, \{ id: '6', x: 70, y: 30 \}, \{ id: '7', x: 20, y: 60 \}, \{ id: '8', x: 30, y: 60 \},\s*\{ id: '9', x: 40, y: 60 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 18.75, y: 62.5 }, { id: '2', x: 23.75, y: 45 }, { id: '3', x: 38.75, y: 45 }, { id: '4', x: 38.75, y: 28.75 },
          { id: '5', x: 54.3, y: 45 }, { id: '6', x: 68.75, y: 62.5 }, { id: '7', x: 71.8, y: 62.5 }, { id: '8', x: 72.5, y: 37.5 }
        ]`
);

// 9. Pneumatic Brake
content = content.replace(
  /imageMarkers: \[\s*\{ id: '1', x: 20, y: 30 \}, \{ id: '2', x: 30, y: 30 \}, \{ id: '3', x: 40, y: 30 \}, \{ id: '4', x: 50, y: 30 \},\s*\{ id: '5', x: 60, y: 30 \}, \{ id: '6', x: 70, y: 30 \}, \{ id: '7', x: 20, y: 60 \}, \{ id: '8', x: 30, y: 60 \},\s*\{ id: '9', x: 40, y: 60 \}, \{ id: '10', x: 50, y: 60 \}, \{ id: '11', x: 60, y: 60 \}, \{ id: '12', x: 70, y: 60 \}\s*\]/,
  `imageMarkers: [
          { id: '1', x: 17.5, y: 47.5 }, { id: '2', x: 37.5, y: 47.5 }, { id: '3', x: 61.25, y: 47.5 }, { id: '4', x: 83.75, y: 62.5 },
          { id: '5', x: 50, y: 47.5 }, { id: '6', x: 93.1, y: 62.5 }
        ]`
);

fs.writeFileSync('src/data/lessons.ts', content);
console.log('Done updating markers');
