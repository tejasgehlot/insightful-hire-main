AI-Enabled Intelligent Assessment & Hiring Platform (AssessAI)


Live Demo: https://insightful-hire.vercel.app/
🚀 Project Overview
AssessAI is a microservices-based recruitment platform designed to eliminate hiring bias and streamline the talent acquisition process. By leveraging AI to parse job descriptions (JDs) and generate tailored evaluations, the platform ensures that candidates are judged fairly on their skills while providing recruiters with a secure, data-driven command center for hiring.
The platform is built to handle high-volume demand, boasting a 95% fraud detection rate.

--------------------------------------------------------------------------------
🛠 Tech Stack
• Frontend: React, Next.js
• Backend: Node.js
• Database: MongoDB
• AI Service: Python-based microservice utilizing pre-trained models for JD parsing and question generation.
• Infrastructure: Docker (Containerized Microservices Architecture)

--------------------------------------------------------------------------------
🔄 Platform Workflow
1. Entry Point
• The journey begins at the Landing Page, where users can explore core features like JD Intelligence and Explainable Scoring.
• Clicking "Start Free Trial" directs users to the authentication flow.
2. Role Selection
• Users must choose their path: Recruiter or Candidate.
• Recruiters focus on finding and assessing the best talent with AI-powered tools.
• Candidates take assessments to showcase their skills to top employers.
3. Candidate Journey
• Signup: Candidates fill in their credentials (Name, Email, Password) to build their professional profile.
• Browse JDs: Once logged in, candidates enter the Find Assessments page, where they can search for job opportunities by title, company, or location (e.g., Senior Frontend Developer, Data Scientist).
• Intelligent Assessment:
    ◦ Step 1: The candidate uploads their resume (PDF, DOC, DOCX).
    ◦ Step 2: The AI generates role-specific assessment questions based on the job requirements.
• Candidate Dashboard: After submission, the user is redirected to a comprehensive dashboard featuring:
    ◦ Upcoming Assessments: Tracks pending tests and their durations.
    ◦ Completed Assessments: Displays scores (e.g., 87% Passed) and detailed results.
    ◦ Skill Analytics: Visualizes proficiency in specific areas like React, TypeScript, or Problem Solving.
4. Recruiter Journey
• Signup: Recruiters provide work details and company names to start their 14-day free trial.
• Recruiter Dashboard: A powerful "hiring command center" that includes:
    ◦ Key Metrics: Real-time tracking of Active Campaigns, Total Candidates, Avg. Time to Hire, and Fraud Detected.
    ◦ Active Campaigns: A list showing the number of candidates and shortlists for each role.
    ◦ Sidebar Navigation: Access to JD Library, Question Bank, Campaign Management, Candidate Tracking, Analytics, and AI Proctoring logs.

--------------------------------------------------------------------------------
✨ Key Features
• JD Intelligence: Automatically extracts skills and priorities from uploaded JDs.
• Auto-Generated Assessments: Creates role-specific MCQs and coding challenges in seconds.
• Anti-Fraud & Proctoring: Includes real-time monitoring, plagiarism detection, and behavioral analysis to ensure integrity.
• Explainable Scoring: Provides transparent breakdowns and confidence scores for every hiring decision.
• Bias-Free Hiring: Utilizes fairness metrics to ensure equitable evaluation of all candidates.

--------------------------------------------------------------------------------
🐳 Deployment
The entire ecosystem is containerized using Docker, ensuring seamless deployment of the Node.js, Next.js, and Python microservices across any environment.
