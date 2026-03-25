// Mock Data Generator for EduPulse v2

const FIRST_NAMES = ["Alice","Bob","Charlie","Diana","Eve","Frank","Grace","Hank","Ivy","Jack","Karen","Liam","Mia","Noah","Olivia","Paul","Quinn","Ryan","Sophia","Tom"];
const LAST_NAMES = ["Adams","Baker","Clark","Davis","Evans","Foster","Ghosh","Harris","Irwin","Jones","King","Lee","Moore","Nelson","Owens","Perez","Quinn","Roberts","Smith","Taylor"];
const SECTIONS = ["A", "B", "C"];
const POSSIBLE_ACHIEVEMENTS = [
  "Perfect Attendance (Term 1)", "Top 10% Scorer", "Most Improved", "Consistent Helper", "Science Fair Finalist", "100% on Midterm"
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const calculateRisk = (score, attendance) => {
  if (score < 50 || attendance < 60) return "High";
  if (score < 70 || attendance < 75) return "Medium";
  return "Low";
};

export const generateStudents = (count = 50) => {
  const students = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[randomInt(0, FIRST_NAMES.length - 1)];
    const lastName = LAST_NAMES[randomInt(0, LAST_NAMES.length - 1)];
    const section = SECTIONS[randomInt(0, SECTIONS.length - 1)];
    
    // Base generator logic
    const baseAttendance = randomInt(40, 100);
    const attendanceFactor = baseAttendance / 100;
    
    let expectedScore = 40 + (attendanceFactor * 50);
    let finalScore = Math.min(100, Math.max(0, Math.round(expectedScore + (randomInt(-15, 15)))));
    
    const risk = calculateRisk(finalScore, baseAttendance);
    
    // Exactly 4 terms history: Term 1, Term 2, Term 3, Current (Term 4 represents 'score')
    // Let's generate a progression showing either decline or improvement or stable
    const progressionType = randomInt(1, 3); // 1: declining, 2: improving, 3: stable
    let history = [];
    
    let startScore;
    if (progressionType === 1) { // declining
       startScore = Math.min(100, finalScore + randomInt(15, 30));
       history = [startScore, startScore - randomInt(5, 10), startScore - randomInt(10, 20), finalScore];
    } else if (progressionType === 2) { // improving
       startScore = Math.max(0, finalScore - randomInt(15, 30));
       history = [startScore, startScore + randomInt(5, 10), startScore + randomInt(10, 20), finalScore];
    } else { // stable
       history = [
         finalScore + randomInt(-5, 5), 
         finalScore + randomInt(-5, 5), 
         finalScore + randomInt(-5, 5), 
         finalScore
       ];
    }
    
    // clamp history
    history = history.map(s => Math.min(100, Math.max(0, s)));

    // Assign 0 to 3 random achievements
    const numAchievements = randomInt(0, 3);
    const achievements = [];
    const available = [...POSSIBLE_ACHIEVEMENTS];
    for (let j = 0; j < numAchievements; j++) {
      const idx = randomInt(0, available.length - 1);
      achievements.push(available.splice(idx, 1)[0]);
    }

    students.push({
      id: `STU-${1000 + i}`,
      name: `${firstName} ${lastName}`,
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
      section: section,
      score: finalScore,
      attendance: baseAttendance,
      participation: randomInt(10, 100),
      risk: risk,
      history: history,
      achievements: achievements,
      rank: 0, 
      progressionType: progressionType === 1 ? 'declining' : progressionType === 2 ? 'improving' : 'stable'
    });
  }
  
  students.sort((a, b) => b.score - a.score);
  students.forEach((s, idx) => {
    s.rank = idx + 1;
  });
  
  return students;
};

export const mockStudents = generateStudents(60);

export const getDashboardStats = (students = mockStudents) => {
  const total = students.length;
  const highRisk = students.filter(s => s.risk === 'High').length;
  const avgAttendance = Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / total);
  const passCount = students.filter(s => s.score >= 50).length;
  const passRate = Math.round((passCount / total) * 100);

  return {
    totalStudents: total,
    highRiskCount: highRisk,
    averageAttendance: avgAttendance,
    passRate: passRate
  };
};

export const evaluateAIInsights = (students = mockStudents) => {
  const insights = [];
  
  // Rule 1: High concentration of at-risk students in a section
  const sectionCounts = { A: { total: 0, risk: 0 }, B: { total: 0, risk: 0 }, C: { total: 0, risk: 0 } };
  students.forEach(s => {
    sectionCounts[s.section].total++;
    if (s.risk === 'High') sectionCounts[s.section].risk++;
  });
  
  Object.keys(sectionCounts).forEach(sec => {
    const data = sectionCounts[sec];
    if (data.total > 0 && (data.risk / data.total) > 0.3) {
      insights.push({ type: 'danger', message: `Critical: Over 30% of Section ${sec} is marked as High Risk.` });
    }
  });

  // Rule 2: Sudden general decline (simplistic: check if Term 4 avg < Term 1 avg)
  const term1Avg = students.reduce((acc, s) => acc + s.history[0], 0) / students.length;
  const term4Avg = students.reduce((acc, s) => acc + s.history[3], 0) / students.length;
  
  if (term4Avg < term1Avg - 5) {
    insights.push({ type: 'warning', message: `Warning: Overall cohort performance has dropped by ${Math.round(term1Avg - term4Avg)}% since Term 1.` });
  } else if (term4Avg > term1Avg + 5) {
    insights.push({ type: 'success', message: `Positive: Cohort average score has improved significantly since Term 1.` });
  }

  // Rule 3: Attendance vs Performance anomaly
  const highAttendanceLowScore = students.filter(s => s.attendance > 90 && s.score < 60);
  if (highAttendanceLowScore.length > 3) {
    insights.push({ type: 'warning', message: `Anomaly: ${highAttendanceLowScore.length} students have >90% attendance but are scoring below 60%. Review teaching methods.` });
  }
  
  if (insights.length === 0) {
    insights.push({ type: 'info', message: `Cohort performance is stable. No critical interventions flagged globally.` });
  }

  return insights;
};
