const fs = require('fs');

const q1 = JSON.parse(fs.readFileSync('q1.json', 'utf8'));
const q2 = JSON.parse(fs.readFileSync('q2.json', 'utf8'));

let lessonsContent = fs.readFileSync('src/data/lessons.ts', 'utf8');

// We will use a regex to find each lesson block and replace its quiz array.
// The regex needs to match `id: "lesson-id",` and then find the `quiz: [` block.

function replaceQuiz(content, lessonId, newQuiz) {
  const idRegex = new RegExp(`id:\\s*"${lessonId}"[\\s\\S]*?quiz:\\s*\\[`);
  const match = content.match(idRegex);
  if (!match) {
    console.log("Could not find lesson:", lessonId);
    return content;
  }
  
  const startIndex = match.index + match[0].length - 1; // points to '['
  
  // Find the matching closing bracket for the quiz array
  let bracketCount = 0;
  let endIndex = -1;
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    if (content[i] === ']') bracketCount--;
    if (bracketCount === 0) {
      endIndex = i;
      break;
    }
  }
  
  if (endIndex === -1) {
    console.log("Could not find end of quiz array for:", lessonId);
    return content;
  }
  
  const newQuizStr = JSON.stringify(newQuiz, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // remove quotes around keys
    .replace(/\n/g, '\n    '); // indent
    
  return content.substring(0, startIndex) + newQuizStr + content.substring(endIndex + 1);
}

// Chapter 6
lessonsContent = replaceQuiz(lessonsContent, 'ice-overview', q1.slice(0, 12));
lessonsContent = replaceQuiz(lessonsContent, 'ice-principles', q1.slice(12, 25));
lessonsContent = replaceQuiz(lessonsContent, 'ice-mechanisms', q1.slice(25, 37));
lessonsContent = replaceQuiz(lessonsContent, 'ice-systems', q1.slice(37, 49));

// Chapter 7
lessonsContent = replaceQuiz(lessonsContent, 'auto-overview', q2.slice(0, 10));
lessonsContent = replaceQuiz(lessonsContent, 'powertrain', q2.slice(10, 20));
lessonsContent = replaceQuiz(lessonsContent, 'wheels-suspension', q2.slice(20, 30));
lessonsContent = replaceQuiz(lessonsContent, 'steering-system', q2.slice(30, 40));
lessonsContent = replaceQuiz(lessonsContent, 'braking-safety', q2.slice(40, 50));

fs.writeFileSync('src/data/lessons.ts', lessonsContent);
console.log("Done updating lessons.ts");
