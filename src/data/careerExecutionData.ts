import { CareerExecutionPipeline, Career } from '../types/career';

export const CAREER_EXECUTION_PIPELINES: Record<string, CareerExecutionPipeline> = {
  'career-software-engineer': {
    careerId: 'career-software-engineer',
    careerTitle: 'Software Development Engineer & Tech Lead',
    skillsHub: [
      {
        category: 'Core Computer Science & Coding',
        skills: ['Data Structures & Algorithms (Trees, Graphs, DP)', 'Object Oriented Programming (Java/C++/Python)', 'Database Management (SQL, Indexing, Transactions)', 'Computer Networks & Operating Systems'],
        estimatedWeeks: '16–24 Weeks',
        recommendedResources: [
          { name: 'NeetCode 150 / Striver A2Z DSA Sheet', type: 'Practice' },
          { name: 'freeCodeCamp Full-Stack Curriculum', type: 'Free Course' },
          { name: 'CS50: Introduction to Computer Science (Harvard)', type: 'Free Course' },
        ],
      },
      {
        category: 'Modern Web, Cloud & DevOps',
        skills: ['React / Next.js / TypeScript', 'Backend APIs (Node.js/Express, Spring Boot, or Go)', 'Docker, Kubernetes & Containerization', 'AWS / GCP Basics (S3, EC2, Lambda)'],
        estimatedWeeks: '12–16 Weeks',
        recommendedResources: [
          { name: 'Full Stack Open (University of Helsinki)', type: 'Free Course' },
          { name: 'The Odin Project', type: 'Platform' },
          { name: 'AWS Skill Builder Cloud Essentials', type: 'Documentation' },
        ],
      },
      {
        category: 'Soft Skills & Engineering Culture',
        skills: ['Git Version Control & PR Review Etiquette', 'Clear Tech Writing & RFCs', 'Agile & Scrum Sprints', 'Stakeholder Communication'],
        estimatedWeeks: 'Ongoing (4 Weeks)',
        recommendedResources: [
          { name: 'GitHub Skills Interactive Tutorials', type: 'Platform' },
          { name: 'Google Tech Writing Course', type: 'Free Course' },
        ],
      },
    ],
    projects: [
      {
        tier: 'Beginner',
        title: 'Real-Time Collaborative Task & Kanban Board',
        problemStatement: 'Teams struggle with fragmented task management without live synchronization across multiple tabs and devices.',
        recommendedTechStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase / Supabase', 'WebSockets'],
        keyFeatures: ['Drag-and-drop task status change', 'Live multi-user updates via WebSockets', 'OAuth authentication (Google/GitHub)', 'Role-based access (Admin, Member)'],
        portfolioImpact: 'Demonstrates modern frontend component architecture, state management, and real-time backend integration.',
      },
      {
        tier: 'Intermediate',
        title: 'Distributed Rate-Limiting & URL Shortener Microservice',
        problemStatement: 'High-throughput microservices suffer from denial of service and noisy neighbor traffic spikes if not strictly throttled.',
        recommendedTechStack: ['Go or Node.js', 'Redis', 'PostgreSQL', 'Docker', 'Swagger OpenAPI'],
        keyFeatures: ['Token Bucket / Sliding Window rate-limiting algorithm in Redis', 'High-speed hashing for 7-character URLs', 'Comprehensive analytics (clicks, geo-IP, referral agent)', 'Docker Compose deployment with automated unit/integration tests'],
        portfolioImpact: 'Shows recruiters that you understand system design, caching layers, Redis concurrency, and backend throughput optimization.',
      },
      {
        tier: 'Industry Capstone',
        title: 'Event-Driven E-Commerce Order Fulfillment & Payment Pipeline',
        problemStatement: 'Large retail platforms need resilient payment checkouts that tolerate third-party gateway timeouts without double-charging.',
        recommendedTechStack: ['Spring Boot or NestJS', 'Apache Kafka / RabbitMQ', 'PostgreSQL', 'Stripe/Razorpay Webhooks', 'Docker & Kubernetes'],
        keyFeatures: ['Saga Pattern for distributed transaction management', 'Idempotent payment webhook processing', 'Kafka event streaming for order placement, inventory deduction, and invoice generation', 'Prometheus & Grafana monitoring dashboards'],
        portfolioImpact: 'Tier-1 FAANG/Unicorn recruiters look for distributed systems, message queues, and financial idempotency on college resumes.',
      },
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect – Associate',
        issuingBody: 'Amazon Web Services (AWS)',
        level: 'Associate',
        estimatedCost: '$150 (~₹12,500) or student discounts',
        worthScore: 'High ROI',
        whyItMatters: 'Top cloud credential universally respected across startups and product MNCs.',
      },
      {
        name: 'Certified Kubernetes Application Developer (CKAD)',
        issuingBody: 'Cloud Native Computing Foundation (CNCF)',
        level: 'Professional',
        estimatedCost: '~$395 (Look for CNCF Student Cyber Week)',
        worthScore: 'Recommended',
        whyItMatters: 'Demonstrates deep container orchestration competency; stands out immensely for cloud/backend roles.',
      },
      {
        name: 'Oracle Certified Professional: Java SE Developer',
        issuingBody: 'Oracle',
        level: 'Associate',
        estimatedCost: '~$245',
        worthScore: 'Bonus',
        whyItMatters: 'Strong differentiator for banking and enterprise fintech campus placements (Morgan Stanley, Goldman Sachs).',
      },
    ],
    internships: {
      idealTimeline: 'Summer after 4th Semester (Year 2) or 6th Semester (Year 3)',
      topPlatforms: ['Wellfound (formerly AngelList)', 'LinkedIn Jobs & InMail', 'Internshala', 'Unstop Hackathons', 'GitHub Externship'],
      keyRequirements: ['1 solid deployed full-stack project', '150+ LeetCode DSA questions solved', 'Clean GitHub profile with consistent commit green graph'],
      stipendRange: '₹25,000 to ₹1,20,000 / month (Top product firms offer ₹80K–₹1.5L/mo for summer interns)',
      coldOutreachTemplate: {
        subject: 'B.Tech CS Student | Full-Stack & Systems Engineering Intern Application',
        body: 'Hi [Name/Engineering Lead],\n\nI have been closely following [Company Name]\'s work on [Specific Product Feature or Tech Blog post]. As a 3rd-year CS student proficient in TypeScript, Node.js, and Redis, I recently built [Project Name - Link], which solves [Problem] using [Tech Stack].\n\nI would love the opportunity to contribute as a Software Engineering Intern for [Summer/Fall 202X]. Here is my GitHub ([Link]) and Resume ([Link]). Would you be open to a brief 10-minute chat this week?\n\nBest regards,\n[Your Name] | [Phone] | [Portfolio Link]',
      },
    },
    resumeGuide: {
      atsGuidelines: [
        'Use single-column standard format (avoid fancy two-column graphics that break ATS parsers).',
        'Include live hyperlinks to deployed applications and GitHub repositories.',
        'Group technical skills into Languages, Frameworks, Developer Tools, and Cloud/Databases.',
        'Keep length strictly to 1 Page for undergraduate and fresh graduate roles.',
      ],
      googleXyzExamples: [
        {
          x: 'Engineered an asynchronous payment notification pipeline',
          y: 'reducing transaction processing latency by 38% and eliminating webhook drop rates',
          z: 'by integrating Apache Kafka event streams and Redis caching with retry policies.',
          fullBullet: 'Engineered an asynchronous payment notification pipeline using Apache Kafka and Redis, reducing transaction processing latency by 38% and eliminating webhook drop rates across 5,000+ daily mock transactions.',
        },
        {
          x: 'Developed a real-time collaborative document editor',
          y: 'supporting 50+ concurrent users with zero race conditions',
          z: 'using WebSockets and Conflict-Free Replicated Data Types (CRDTs).',
          fullBullet: 'Developed a real-time collaborative document editor using React and WebSockets, enabling 50+ concurrent users to co-author with sub-50ms latency using CRDT conflict resolution.',
        },
      ],
      actionVerbs: ['Architected', 'Spearheaded', 'Optimized', 'Refactored', 'Deployed', 'Containerized', 'Benchmarked', 'Automated'],
      portfolioMustHaves: [
        'Live working demo link on Vercel / Render / AWS',
        'Clean GitHub README with architecture diagram, setup commands, and API documentation',
        'Lighthouse performance score of 90+ on web projects',
        'Unit tests coverage badge (Jest / PyTest / Go Test)',
      ],
    },
    mockInterviews: [
      {
        question: 'How does a Hash Map work under the hood, and how do you resolve hash collisions?',
        roundType: 'Technical',
        idealAnswerFramework: 'Explain hash functions -> bucket arrays -> load factor and rehashing -> separate chaining (LinkedList / Red-Black Tree in Java 8+) vs open addressing (linear probing / quadratic probing).',
        starTip: 'Always mention time complexity: O(1) average lookup and O(n) worst-case degradation when all keys collide.',
      },
      {
        question: 'Explain what happens from the moment you type google.com into your browser until the page renders.',
        roundType: 'Technical',
        idealAnswerFramework: 'DNS lookup (browser cache, OS cache, recursive resolver) -> TCP 3-Way Handshake (SYN, SYN-ACK, ACK) -> TLS 1.3 Handshake -> HTTP GET Request -> Server processing -> HTTP Response (200 OK) -> DOM / CSSOM tree generation -> Render tree -> Layout -> Paint.',
        starTip: 'Structure your explanation like a data packet traversing network layers.',
      },
      {
        question: 'Tell me about a time you faced a critical bug or technical blocker right before a deadline.',
        roundType: 'HR / Behavioral',
        idealAnswerFramework: 'Situation (hackathon or college submission) -> Task (what broke) -> Action (how you methodically debugged using logs, isolated the component, and communicated clearly) -> Result (successful deployment, what you learned to prevent it).',
        starTip: 'Focus on staying calm, using diagnostic logs over panic, and post-incident root-cause analysis.',
      },
      {
        question: 'Design a scalable real-time notifications service like WhatsApp or Twitter push alerts.',
        roundType: 'System Design / Case Study',
        idealAnswerFramework: 'Functional vs Non-Functional requirements -> High-level architecture (API Gateway, WebSocket Gateway, User Service, Notification Worker) -> Message Queue (Kafka/RabbitMQ) -> APNS/FCM connectors -> Database schema & delivery status tracking.',
        starTip: 'Clarify scale (e.g. 10M daily active users) and identify bottlenecks (connection handling, mobile battery life) early.',
      },
    ],
    placementPrep: {
      timelinePhases: [
        {
          phase: 'Phase 1: Foundations & DSA Core',
          duration: 'Semesters 3 & 4 (Months 1–6)',
          focusAreas: ['Arrays, Strings, Recursion, LinkedLists, Stacks, Queues, Binary Trees', 'Time & Space Complexity analysis', 'Aptitude: Quantitative Math (Percentages, P&C, Probability)'],
        },
        {
          phase: 'Phase 2: Advanced DSA & Core CS Subjects',
          duration: 'Semesters 5 & 6 (Months 7–12)',
          focusAreas: ['Dynamic Programming, Graphs, Disjoint Set Union', 'DBMS (SQL queries, Normalization, ACID properties)', 'Operating Systems (Concurrency, Deadlocks, Paging, Virtual Memory)', 'Computer Networks (OSI Model, TCP vs UDP, HTTP/HTTPS)'],
        },
        {
          phase: 'Phase 3: Placement Sprint & Mock Rounds',
          duration: 'Semester 7 (Months 13–16)',
          focusAreas: ['Company-specific past papers (TCS Digital, Infosys SP, Amazon, Microsoft)', 'Low-Level Design (LLD) & Object-Oriented Design', 'Peer mock interviews on Pramp / Interviewing.io', 'Resume polishing and project demo rehearsals'],
        },
      ],
      aptitudeTopics: ['Time, Speed & Distance', 'Permutations & Combinations', 'Data Interpretation (Charts & Tables)', 'Logical Deduction & Syllogisms', 'Verbal Ability & Reading Comprehension'],
      coreSubjectsToRevise: ['Operating Systems (OS)', 'Database Management Systems (DBMS)', 'Object Oriented Programming (OOP)', 'Computer Networks (CN)'],
      recruitmentRounds: ['Online Assessment (OA): 2 DSA Problems + 20 Aptitude Questions', 'Technical Interview 1: Data Structures & Live Coding', 'Technical Interview 2: Core CS Subjects, Projects Deep Dive & System Design', 'HR / Managerial Round: Cultural Fit, Behavioral Questions & Offer Discussion'],
    },
    jobMarket: {
      entryLevelRoles: ['Software Development Engineer I (SDE-1)', 'Graduate Engineering Trainee (GET)', 'Junior Backend Developer', 'Frontend Engineer I', 'Cloud / DevOps Associate'],
      tier1CTC: '₹18 LPA to ₹45+ LPA (IITs, NITs, BITS, Top Product Companies)',
      tier2CTC: '₹8 LPA to ₹18 LPA (Top State Govt & Reputed Private Universities)',
      tier3CTC: '₹4.5 LPA to ₹8 LPA (Mass Recruitment: TCS Digital, Cognizant GenC Next, Wipro Turbo, Startups)',
      topHiringCompanies: ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Atlassian', 'Flipkart', 'Swiggy', 'Zomato', 'TCS', 'Infosys', 'Accenture'],
      hiringHubs: ['Bengaluru', 'Hyderabad', 'Pune', 'Gurugram / NCR', 'Chennai', 'Remote'],
    },
    growthLadder: {
      stages: [
        {
          title: 'SDE-1 (Junior Developer)',
          experienceYears: '0–2 Years',
          expectedCTC: '₹8L – ₹25L',
          responsibilities: 'Writing clean, tested code; implementing features from technical specs; fixing production bugs and handling on-call tickets.',
          keySkillsToUpgrade: ['Deep framework mastery', 'Clean Code & TDD', 'Git rebase & CI/CD'],
        },
        {
          title: 'SDE-2 (Senior Software Engineer)',
          experienceYears: '2–5 Years',
          expectedCTC: '₹22L – ₹50L',
          responsibilities: 'Designing component architecture; leading module deliverables; mentoring junior engineers; writing design documents (RFCs).',
          keySkillsToUpgrade: ['System Design (LLD & HLD)', 'Performance Profiling', 'Distributed Caching & Queues'],
        },
        {
          title: 'SDE-3 / Tech Lead',
          experienceYears: '5–8 Years',
          expectedCTC: '₹45L – ₹80L+',
          responsibilities: 'Architecting entire subsystem domains; cross-team technical alignment; unblocking team velocity; balancing technical debt with business velocity.',
          keySkillsToUpgrade: ['Large-scale Distributed Systems', 'Team Leadership', 'Budgeting & Cloud Cost Optimization'],
        },
        {
          title: 'Staff Engineer / Engineering Manager / Director',
          experienceYears: '8+ Years',
          expectedCTC: '₹80L – ₹1.5 Cr+ (Including Stock Options / ESOPs)',
          responsibilities: 'Setting technical vision for whole organization; steering platform migration; hiring senior talent; driving business impact through tech.',
          keySkillsToUpgrade: ['Organizational Design', 'Executive Communication', 'Long-term Product Strategy'],
        },
      ],
      emergingTrends: ['AI-Augmented Software Engineering (Copilot, Cursor, LLM Agents)', 'Rust for High-Performance Infrastructure', 'Serverless & Edge Computing', 'Platform Engineering & Internal Developer Platforms (IDP)'],
    },
    checklistItems: [
      { id: 'sde-chk-1', stageName: 'Skill Learning', title: 'Master Core DSA & Solve 150+ Questions', description: 'Solve standard Striver / NeetCode problems in Trees, Graphs, DP, and HashMaps.' },
      { id: 'sde-chk-2', stageName: 'Projects', title: 'Build 1 Full-Stack Production App with Database', description: 'Deploy a live application with authentication, database models, and responsive UI.' },
      { id: 'sde-chk-3', stageName: 'Certifications', title: 'Complete Cloud Fundamentals (AWS / GCP)', description: 'Gain foundational familiarity with cloud hosting, serverless functions, and storage.' },
      { id: 'sde-chk-4', stageName: 'Internships', title: 'Apply to at least 25 Internship Postings with Tailored Pitches', description: 'Use targeted outreach on Wellfound, LinkedIn, and university placement portals.' },
      { id: 'sde-chk-5', stageName: 'Resume & Portfolio', title: 'Pass 80+ Score on ATS Resume Checker', description: 'Format resume with Google XYZ bullets and verified GitHub/demo links.' },
      { id: 'sde-chk-6', stageName: 'Mock Interview', title: 'Complete 3 Live Mock Technical Coding Rounds', description: 'Practice live problem-solving while speaking your thought process aloud.' },
      { id: 'sde-chk-7', stageName: 'Placement Prep', title: 'Revise OS, DBMS, OOP & Computer Networks', description: 'Prepare rapid-fire answers for ACID properties, indexing, processes vs threads.' },
      { id: 'sde-chk-8', stageName: 'Job Recommendation', title: 'Target 10 Dream Companies & 15 Realistic Companies', description: 'Create an organized spreadsheet tracking application dates, referral contacts, and deadlines.' },
    ],
  },

  'career-ai-ml-engineer': {
    careerId: 'career-ai-ml-engineer',
    careerTitle: 'AI/ML Scientist & Quantitative Modeler',
    skillsHub: [
      {
        category: 'Mathematics & Statistical Foundations',
        skills: ['Linear Algebra (Eigenvalues, SVD, Matrix Decomposition)', 'Multivariate Calculus (Gradients, Jacobians, Backprop)', 'Probability & Bayesian Inference', 'Statistical Hypothesis Testing'],
        estimatedWeeks: '14–18 Weeks',
        recommendedResources: [
          { name: '3Blue1Brown: Essence of Linear Algebra', type: 'Free Course' },
          { name: 'Khan Academy: Multivariable Calculus', type: 'Free Course' },
          { name: 'StatQuest with Josh Starmer', type: 'Platform' },
        ],
      },
      {
        category: 'Machine Learning & Deep Learning',
        skills: ['Python, NumPy, Pandas, Scikit-Learn', 'PyTorch / TensorFlow Deep Learning', 'Transformers, Attention Mechanisms & LLMs', 'Computer Vision (CNNs, YOLO) & NLP (spaCy, HuggingFace)'],
        estimatedWeeks: '16–22 Weeks',
        recommendedResources: [
          { name: 'Fast.ai: Practical Deep Learning for Coders', type: 'Free Course' },
          { name: 'DeepLearning.AI: Machine Learning Specialization', type: 'Platform' },
          { name: 'Hugging Face NLP Course', type: 'Documentation' },
        ],
      },
      {
        category: 'MLOps & Production AI Deployment',
        skills: ['Model Serving (FastAPI, ONNX, TensorRT)', 'Vector Databases (Pinecone, Milvus, Qdrant, Chroma)', 'RAG (Retrieval-Augmented Generation) Architecture', 'Weights & Biases (W&B) Experiment Tracking'],
        estimatedWeeks: '10–14 Weeks',
        recommendedResources: [
          { name: 'Made With ML: MLOps Course by Goku Mohandas', type: 'Free Course' },
          { name: 'LangChain & LlamaIndex Official Guides', type: 'Documentation' },
        ],
      },
    ],
    projects: [
      {
        tier: 'Beginner',
        title: 'End-to-End Customer Churn Prediction Engine with Streamlit',
        problemStatement: 'Telecom and SaaS companies bleed revenue from subscriber cancellations without early warning signals.',
        recommendedTechStack: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Streamlit UI'],
        keyFeatures: ['Automated feature engineering and outlier detection', 'ROC-AUC evaluation benchmarked against logistic regression', 'Interactive slider UI for loan/churn probability scoring', 'SHAP explainability plots showing key drivers'],
        portfolioImpact: 'Demonstrates clean EDA, data preprocessing, model selection, and business explainability.',
      },
      {
        tier: 'Intermediate',
        title: 'Multi-Modal Document Intelligence & Semantic RAG System',
        problemStatement: 'Enterprises struggle to query messy PDFs, medical charts, and financial statements with generic LLMs.',
        recommendedTechStack: ['PyTorch', 'HuggingFace Transformers', 'LangChain', 'ChromaDB', 'FastAPI'],
        keyFeatures: ['Hybrid dense + sparse semantic search (BM25 + BGE Embeddings)', 'Chunking strategies with parent-document retrievers', 'Hallucination guardrails and source citation references', 'Evaluation metrics with RAGAS (Faithfulness, Context Recall)'],
        portfolioImpact: 'Proves to AI startups that you can build enterprise-grade Generative AI applications beyond toy API wrappers.',
      },
      {
        tier: 'Industry Capstone',
        title: 'Fine-Tuned Domain-Specific LLM with Quantization & Low-Rank Adaptation (LoRA)',
        problemStatement: 'Commercial closed LLM APIs are expensive, have latency, and leak private enterprise compliance data.',
        recommendedTechStack: ['PyTorch', 'Unsloth / Hugging Face PEFT', 'BitsAndBytes (QLoRA)', 'vLLM', 'Docker'],
        keyFeatures: ['Instruction dataset curation and deduplication', '4-bit QLoRA fine-tuning of Llama 3 / Mistral on custom legal/medical corpus', 'Perplexity and benchmark evaluations against base model', 'High-throughput deployment via vLLM with PagedAttention'],
        portfolioImpact: 'Top-tier AI labs look for candidates who understand model weights, tensor parallelization, and parameter-efficient fine-tuning.',
      },
    ],
    certifications: [
      {
        name: 'DeepLearning.AI TensorFlow / PyTorch Developer',
        issuingBody: 'DeepLearning.AI / Coursera',
        level: 'Associate',
        estimatedCost: 'Coursera Subscription or Financial Aid',
        worthScore: 'High ROI',
        whyItMatters: 'Strong signal of rigorous mathematical and code training curated by Andrew Ng.',
      },
      {
        name: 'AWS Certified Machine Learning – Specialty',
        issuingBody: 'Amazon Web Services',
        level: 'Professional',
        estimatedCost: '$300 (~₹25,000)',
        worthScore: 'Recommended',
        whyItMatters: 'Highly respected across corporate AI engineering teams for production SageMaker workflows.',
      },
      {
        name: 'Kaggle Competitions Master / Expert Badge',
        issuingBody: 'Kaggle (Google)',
        level: 'Apex',
        estimatedCost: 'Free ($0)',
        worthScore: 'Essential',
        whyItMatters: 'Carries more weight than paper certificates; proves ability to win real competitive modeling tasks.',
      },
    ],
    internships: {
      idealTimeline: 'Winter/Summer between 3rd and 4th Year',
      topPlatforms: ['Kaggle Discussions', 'Hugging Face Community', 'LinkedIn AI Research Lab pages', 'AI Research Labs (IITs, IISc, TIFR, Microsoft Research)'],
      keyRequirements: ['Strong GitHub showing model weights/notebooks', 'Clean Kaggle profile with bronze/silver medals', 'Good grasp of PyTorch and mathematical derivation'],
      stipendRange: '₹35,000 to ₹1,50,000 / month',
      coldOutreachTemplate: {
        subject: 'Undergrad ML Researcher | Contribution to [Specific Research Paper / Open Source Model]',
        body: 'Dear Dr. / Prof. [Name],\n\nI read your recent work on [Paper Name or Project] with great interest, particularly how you tackled [specific methodology detail].\n\nI am a 3rd-year student with hands-on research in [Your Subdomain: e.g. RAG latency / Vision Transformers]. I recently open-sourced [Project Link], achieving [specific metric, e.g., 94.2% F1 score on benchmark].\n\nI would love to contribute to your lab or engineering team as an ML Research Intern. Attached is my CV and GitHub ([Link]). Thank you for your time!\n\nSincerely,\n[Your Name] | [Google Scholar / GitHub Link]',
      },
    },
    resumeGuide: {
      atsGuidelines: [
        'Highlight measurable metrics (e.g., F1-score, inference latency in ms, GPU memory reduction in GB).',
        'State dataset sizes (e.g., trained on 2.4M tokens / 150,000 annotated images).',
        'List mathematical libraries clearly: PyTorch, JAX, NumPy, SciPy, HuggingFace.',
      ],
      googleXyzExamples: [
        {
          x: 'Trained and optimized a Vision Transformer model for defect detection',
          y: 'achieving 98.4% precision and reducing inspection cycle time by 45%',
          z: 'using TensorRT quantization and knowledge distillation on edge NVIDIA Jetson hardware.',
          fullBullet: 'Trained and deployed a quantized Vision Transformer on edge NVIDIA hardware, achieving 98.4% precision and cutting defect inspection latency by 45% across 20,000 factory frames.',
        },
      ],
      actionVerbs: ['Fine-Tuned', 'Distilled', 'Quantized', 'Benchmarked', 'Evaluated', 'Engineered', 'Extracted'],
      portfolioMustHaves: [
        'Interactive Hugging Face Space demo',
        'GitHub repository with `requirements.txt`, reproducible Jupyter notebooks, and WandB charts',
        'Concise blog post explaining model architecture on Medium or personal blog',
      ],
    },
    mockInterviews: [
      {
        question: 'What is the vanishing/exploding gradient problem in Deep Networks, and how do ResNets and LayerNorm solve it?',
        roundType: 'Technical',
        idealAnswerFramework: 'Explain chain rule of backprop through many layers -> small gradients (<1) multiply to 0 -> residual skip connections (F(x) + x) provide direct highway for gradient flow d(x)/dx = 1.',
        starTip: 'Write down the derivative of residual block on whiteboard to impress interviewers.',
      },
      {
        question: 'Compare Self-Attention with Cross-Attention in Transformer architectures.',
        roundType: 'Technical',
        idealAnswerFramework: 'Query, Key, Value vectors -> In Self-Attention, Q, K, V all come from the same sequence -> In Cross-Attention, Q comes from decoder, while K and V come from encoder.',
        starTip: 'Highlight the quadratic O(N^2) complexity and mention FlashAttention optimization.',
      },
      {
        question: 'How do you handle severe class imbalance in fraud detection where positive cases are only 0.05%?',
        roundType: 'System Design / Case Study',
        idealAnswerFramework: 'Do not rely on Accuracy -> Use Precision-Recall AUC and F1-score -> Resampling techniques (SMOTE, Focal Loss) -> Anomaly detection approaches (Isolation Forest, Autoencoders).',
        starTip: 'Discuss the business tradeoff between false positives (annoying real customers) vs false negatives (losing millions to fraud).',
      },
    ],
    placementPrep: {
      timelinePhases: [
        {
          phase: 'Phase 1: Math & Classical ML',
          duration: 'Months 1–4',
          focusAreas: ['Linear algebra derivations, probability distributions', 'Regression, Decision Trees, Random Forests, Boosting (XGBoost/LightGBM)', 'Kaggle beginner competitions'],
        },
        {
          phase: 'Phase 2: Deep Learning & Frameworks',
          duration: 'Months 5–8',
          focusAreas: ['PyTorch tensors, autograd, custom Dataset and DataLoader classes', 'CNN architectures, RNNs, Attention & Transformers', 'GPU training and CUDA memory management'],
        },
        {
          phase: 'Phase 3: Production AI & Research Portfolio',
          duration: 'Months 9–12',
          focusAreas: ['FastAPI model endpoints, ONNX runtime', 'Vector embeddings & LangChain/LlamaIndex RAG pipelines', 'Paper reproduction project and conference submissions'],
        },
      ],
      aptitudeTopics: ['Probability & Combinatorics', 'Matrix Operations', 'Bayes Rule Calculations', 'Logical Puzzles & Graph Theory'],
      coreSubjectsToRevise: ['Calculus & Linear Algebra', 'Data Structures & Algorithms', 'Database Systems & Vector Stores'],
      recruitmentRounds: ['Coding & Math Screening: Matrix code + 1 DSA problem', 'Technical Round 1: Machine Learning theory & paper walkthrough', 'Technical Round 2: Live ML problem take-home / System Design (RAG/Recommendation System)', 'Managerial & Research Culture Fit'],
    },
    jobMarket: {
      entryLevelRoles: ['Junior AI/ML Engineer', 'Data Scientist Trainee', 'Computer Vision Associate', 'NLP Research Associate', 'Quantitative Research Analyst'],
      tier1CTC: '₹22 LPA to ₹55+ LPA',
      tier2CTC: '₹10 LPA to ₹20 LPA',
      tier3CTC: '₹6 LPA to ₹10 LPA',
      topHiringCompanies: ['Google DeepMind', 'Microsoft Research', 'NVIDIA', 'Amazon AWS AI', 'Flipkart Data Science', 'Fractal Analytics', 'Mu Sigma', 'JPMorgan Quant'],
      hiringHubs: ['Bengaluru', 'Hyderabad', 'Gurugram', 'Pune', 'Global Remote'],
    },
    growthLadder: {
      stages: [
        {
          title: 'Associate ML Engineer',
          experienceYears: '0–2 Years',
          expectedCTC: '₹12L – ₹28L',
          responsibilities: 'Data pipeline cleaning; baseline model training; building evaluation pipelines and Streamlit demos.',
          keySkillsToUpgrade: ['PyTorch profiling', 'Docker & Kubernetes', 'Vector Search'],
        },
        {
          title: 'Senior AI Scientist / MLOps Lead',
          experienceYears: '2–5 Years',
          expectedCTC: '₹28L – ₹65L',
          responsibilities: 'Fine-tuning specialized foundation models; reducing inference costs; building production RAG & agentic workflows.',
          keySkillsToUpgrade: ['Distributed training (DeepSpeed, FSDP)', 'Model distillation', 'AI Safety & Red-Teaming'],
        },
        {
          title: 'Principal AI Scientist / VP of AI',
          experienceYears: '6+ Years',
          expectedCTC: '₹75L – ₹1.8 Cr+',
          responsibilities: 'Leading corporate AI strategy; publishing research papers; defining proprietary model architectures and patents.',
          keySkillsToUpgrade: ['Patents & Intellectual Property', 'Executive AI Governance', 'Multi-Million GPU Cluster Management'],
        },
      ],
      emergingTrends: ['Agentic AI Workflows (LangGraph, AutoGen)', 'Small Language Models (SLMs) on edge devices', 'Mechanistic Interpretability', 'Neuromorphic & Quantum Machine Learning'],
    },
    checklistItems: [
      { id: 'ai-chk-1', stageName: 'Skill Learning', title: 'Derive Backpropagation & Linear Algebra by Hand', description: 'Ensure complete clarity on matrix derivatives and chain rule fundamentals.' },
      { id: 'ai-chk-2', stageName: 'Projects', title: 'Build and Deploy 1 Generative AI RAG Application', description: 'Deploy a multi-document semantic search engine with vector storage and evaluation.' },
      { id: 'ai-chk-3', stageName: 'Certifications', title: 'Earn Kaggle Medals or DeepLearning.AI Certificate', description: 'Validate practical modeling skills with public leaderboard submissions.' },
      { id: 'ai-chk-4', stageName: 'Internships', title: 'Work with an AI Startup or University Research Lab', description: 'Gain experience handling messy real-world datasets and GPU cluster constraints.' },
      { id: 'ai-chk-5', stageName: 'Resume & Portfolio', title: 'Host Live Hugging Face Space & Clean GitHub Notebooks', description: 'Provide clickable demos for recruiters to test your model outputs immediately.' },
      { id: 'ai-chk-6', stageName: 'Mock Interview', title: 'Master Bias-Variance, Overfitting & Transformer Attention Q&As', description: 'Be ready to explain every hyperparameter choice in your projects.' },
    ],
  },

  'career-chartered-accountant': {
    careerId: 'career-chartered-accountant',
    careerTitle: 'Chartered Accountant & Chief Financial Officer',
    skillsHub: [
      {
        category: 'Financial Reporting, Auditing & Taxation',
        skills: ['Indian Accounting Standards (Ind AS / IFRS)', 'Statutory, Internal & Tax Auditing Standards', 'Direct Tax (Income Tax Act 1961) & Indirect Tax (GST)', 'Corporate Law & Companies Act 2013'],
        estimatedWeeks: '3–4 Years (Integrated with Articleship)',
        recommendedResources: [
          { name: 'ICAI Official BOS Portal & Study Modules', type: 'Documentation' },
          { name: 'ClearTax GST & Direct Tax Case Law Library', type: 'Platform' },
          { name: 'Taxmann Case Digest & Analysis', type: 'Documentation' },
        ],
      },
      {
        category: 'Financial Modeling & Valuation',
        skills: ['Advanced Financial Modeling in Microsoft Excel', 'Discounted Cash Flow (DCF) & LBO Modeling', 'Mergers & Acquisitions (M&A) Diligence', 'SAP FICO & Tally Prime ERP'],
        estimatedWeeks: '12–16 Weeks',
        recommendedResources: [
          { name: 'Corporate Finance Institute (CFI) FMVA Tracks', type: 'Free Course' },
          { name: 'Aswath Damodaran Valuation Lectures (NYU Stern)', type: 'Free Course' },
        ],
      },
    ],
    projects: [
      {
        tier: 'Beginner',
        title: 'Three-Statement Financial Model for an Indian Listed Corporate',
        problemStatement: 'Investors need linked P&L, Balance Sheet, and Cash Flow forecasts to evaluate capital expenditures.',
        recommendedTechStack: ['MS Excel (Formulas, Pivot, Sensitivity Tables)', 'BSE/NSE Annual Reports', 'Screener.in'],
        keyFeatures: ['Dynamic revenue drivers and depreciation schedule', 'Debt schedule with interest calculations', 'Scenario analysis (Bull, Base, Bear cases)'],
        portfolioImpact: 'Standard benchmark for corporate finance and equity research roles.',
      },
      {
        tier: 'Intermediate',
        title: 'GST Compliance & Input Tax Credit (ITC) Reconciliation Audit Tool',
        problemStatement: 'Companies lose millions when GSTR-2B mismatches with GSTR-3B supplier ledgers.',
        recommendedTechStack: ['Python / Power BI / Excel Power Query', 'GSTN API schema'],
        keyFeatures: ['Automated reconciliation of purchase register against supplier filings', 'Identification of ineligible credit and tax leakage', 'One-click executive tax audit summary dashboard'],
        portfolioImpact: 'Huge talking point for Big 4 audit and tax practice interviews.',
      },
      {
        tier: 'Industry Capstone',
        title: 'Comprehensive M&A Due Diligence & Valuation Report',
        problemStatement: 'Acquirers require multi-scenario DCF and comparable company valuations with quality of earnings (QoE) scrutiny.',
        recommendedTechStack: ['Excel Financial Modeling', 'FactSet / Bloomberg / Capital IQ', 'PowerPoint Deck'],
        keyFeatures: ['DCF valuation with WACC and Terminal Value sensitivity', 'Precedent transaction multiples', 'Working capital normalized adjustments and EBITDA bridge'],
        portfolioImpact: 'Positions candidates for elite Investment Banking and Private Equity analyst recruitments.',
      },
    ],
    certifications: [
      {
        name: 'Chartered Accountant (CA)',
        issuingBody: 'Institute of Chartered Accountants of India (ICAI)',
        level: 'Apex',
        estimatedCost: '~₹80,000 across Foundation, Inter & Final',
        worthScore: 'Essential',
        whyItMatters: 'Statutory authority to sign audit reports and balance sheets in India.',
      },
      {
        name: 'Chartered Financial Analyst (CFA Level 1 & 2)',
        issuingBody: 'CFA Institute (USA)',
        level: 'Professional',
        estimatedCost: '~$1,200 per level',
        worthScore: 'High ROI',
        whyItMatters: 'The gold standard globally for portfolio management and equity analysis.',
      },
      {
        name: 'Financial Risk Manager (FRM)',
        issuingBody: 'GARP',
        level: 'Professional',
        estimatedCost: '~$1,000',
        worthScore: 'Recommended',
        whyItMatters: 'High demand in treasury, risk management, and banking.',
      },
    ],
    internships: {
      idealTimeline: 'Mandatory 2-Year Practical Articleship post CA Intermediate',
      topPlatforms: ['ICAI Articleship Placement Portal', 'Big 4 Direct Alumni Networks', 'LinkedIn Finance Groups'],
      keyRequirements: ['Clear both groups of CA Intermediate', 'ICITSS (Orientation & IT Training) completed', 'Strong Excel and communication skills'],
      stipendRange: '₹10,000 to ₹25,000 / month (Big 4 & Top Tier Firms)',
      coldOutreachTemplate: {
        subject: 'CA Articleship Application | Both Groups Cleared in First Attempt',
        body: 'Respected Partner / HR Team,\n\nI have successfully cleared both groups of CA Intermediate in my first attempt with [Total Marks] and have completed my ICITSS IT & Orientation requirements.\n\nI am eager to pursue my mandatory 2-year practical training with [Firm Name] in [Statutory Audit / Direct Tax / M&A Due Diligence]. Attached is my CV for your kind consideration.\n\nWarm regards,\n[Your Name] | [Phone] | [City]',
      },
    },
    resumeGuide: {
      atsGuidelines: [
        'Place CA Foundation, Inter, and Final rank/marks prominently at the top.',
        'Detail client industries audited during Articleship (e.g., Manufacturing, Banking, IT).',
        'Quantify tax savings, audit observation amounts, and team size managed.',
      ],
      googleXyzExamples: [
        {
          x: 'Executed statutory audit of a ₹450 Cr revenue auto-component manufacturer',
          y: 'identifying ₹3.2 Cr in unrecorded liabilities and inventory valuation discrepancies',
          z: 'by designing automated Excel sample verification models complying with SA 500.',
          fullBullet: 'Executed statutory audit of a ₹450 Cr revenue manufacturer, identifying ₹3.2 Cr in unrecorded liabilities and inventory discrepancies by designing automated Excel sample verification models complying with SA 500.',
        },
      ],
      actionVerbs: ['Audited', 'Reconciled', 'Vetted', 'Appraised', 'Restructured', 'Computed', 'Represented'],
      portfolioMustHaves: ['Financial model sample deck (redacted)', 'Published articles on ICAI newsletter or Taxmann', 'Clean 1-page resume'],
    },
    mockInterviews: [
      {
        question: 'Explain the difference between Ind AS 115 (Revenue from Contracts) and Ind AS 116 (Leases).',
        roundType: 'Technical',
        idealAnswerFramework: '5-step model of Ind AS 115 -> Right-of-Use (ROU) asset and lease liability capitalization under Ind AS 116.',
        starTip: 'Cite practical balance sheet implications on EBITDA and debt-to-equity ratios.',
      },
      {
        question: 'Walk me through how a ₹100 depreciation expense flows through all three financial statements.',
        roundType: 'Technical',
        idealAnswerFramework: 'Income statement: Operating income decreases by ₹100; assuming 30% tax, net income drops by ₹70 -> Cash flow: Net income down ₹70, add back non-cash ₹100 depreciation, cash up ₹30 -> Balance sheet: Cash up ₹30, PP&E down ₹100 (net assets down ₹70), Retained earnings down ₹70 (balanced!).',
        starTip: 'Never hesitate on the tax shield impact (+₹30 cash).',
      },
    ],
    placementPrep: {
      timelinePhases: [
        { phase: 'Phase 1: Articleship Deep-Work', duration: 'Years 1–2 of Articleship', focusAreas: ['Hands-on statutory audit, tax representations, GSTR filings', 'Advanced Excel and presentation skills'] },
        { phase: 'Phase 2: CA Final Examination', duration: 'Final 6 Months study leave', focusAreas: ['Financial Reporting (FR), Strategic Financial Management (SFM), Advanced Auditing'] },
        { phase: 'Phase 3: ICAI Campus Placement', duration: 'Months post results', focusAreas: ['Group Discussions on union budget, mock partner interviews, Big 4 case studies'] },
      ],
      aptitudeTopics: ['Commercial Mathematics', 'Financial Ratios', 'Corporate Governance Principles'],
      coreSubjectsToRevise: ['Ind AS Standards', 'Companies Act 2013', 'Direct & Indirect Tax Provisions'],
      recruitmentRounds: ['Group Discussion (Current economic topics)', 'Technical Interview with Senior Partner', 'HR & Location Preference discussion'],
    },
    jobMarket: {
      entryLevelRoles: ['Audit Senior / Associate', 'Financial Analyst', 'Management Trainee - Finance', 'Tax Consultant', 'Credit Risk Manager'],
      tier1CTC: '₹14 LPA to ₹28 LPA (First attempt rank holders / Investment banks / Top MNCs)',
      tier2CTC: '₹9 LPA to ₹14 LPA (Big 4 & Mid-size firms)',
      tier3CTC: '₹7 LPA to ₹9 LPA',
      topHiringCompanies: ['EY', 'Deloitte', 'PwC', 'KPMG', 'Goldman Sachs', 'Morgan Stanley', 'ITC', 'Hindustan Unilever', 'Tata Sons', 'Reliance'],
      hiringHubs: ['Mumbai', 'Delhi-NCR', 'Bengaluru', 'Chennai', 'Kolkata'],
    },
    growthLadder: {
      stages: [
        { title: 'Assistant Manager / Senior Associate', experienceYears: '0–3 Years', expectedCTC: '₹10L – ₹18L', responsibilities: 'Managing audit teams on ground, drafting audit reports, client interface.', keySkillsToUpgrade: ['Team management', 'Complex tax structuring'] },
        { title: 'Manager / Associate Director', experienceYears: '3–6 Years', expectedCTC: '₹22L – ₹40L', responsibilities: 'Business development, managing multi-crore audit portfolios, advisory mandates.', keySkillsToUpgrade: ['Client negotiation', 'Cross-border M&A'] },
        { title: 'Partner / Chief Financial Officer (CFO)', experienceYears: '7+ Years', expectedCTC: '₹50L – ₹2 Cr+', responsibilities: 'Equity partnership in audit firm or C-suite executive financial leadership of a corporation.', keySkillsToUpgrade: ['Capital allocation', 'Investor relations & IPOs'] },
      ],
      emergingTrends: ['AI-driven automated forensic audit tools', 'ESG (Environmental, Social & Governance) auditing', 'Crypto & Digital Asset taxation'],
    },
    checklistItems: [
      { id: 'ca-chk-1', stageName: 'Skill Learning', title: 'Master Ind AS & Companies Act Provisions', description: 'Understand key standards including Ind AS 115, 116, and 109.' },
      { id: 'ca-chk-2', stageName: 'Projects', title: 'Build a Fully Integrated 3-Statement Excel Model', description: 'Create dynamic forecast models with sensitivity analysis.' },
      { id: 'ca-chk-3', stageName: 'Certifications', title: 'Complete ICAI ITT & Orientation Modules', description: 'Complete official prerequisites prior to articleship commencement.' },
      { id: 'ca-chk-4', stageName: 'Internships', title: 'Secure 2-Year Practical Articleship at Reputed Firm', description: 'Gain deep on-field audit, taxation, and corporate compliance exposure.' },
    ],
  },
};

// Generic pipeline generator for any other career
export function getCareerExecutionPipeline(career: Career): CareerExecutionPipeline {
  if (CAREER_EXECUTION_PIPELINES[career.id]) {
    return CAREER_EXECUTION_PIPELINES[career.id];
  }

  // Intelligent fallback generator tailored to the career's properties
  return {
    careerId: career.id,
    careerTitle: career.title,
    skillsHub: [
      {
        category: 'Core Domain Knowledge & Methodologies',
        skills: career.keySkills.slice(0, 4),
        estimatedWeeks: '16–20 Weeks',
        recommendedResources: [
          { name: 'NPTEL / Swayam Government Certified Courses', type: 'Free Course' },
          { name: 'Coursera Professional Specializations', type: 'Platform' },
          { name: 'Official Industry Body Handbooks & Whitepapers', type: 'Documentation' },
        ],
      },
      {
        category: 'Applied Tools, Software & Technologies',
        skills: career.keySkills.slice(4).concat(['Domain-Specific Analytics', 'Workflow Automation', 'Reporting & Documentation']),
        estimatedWeeks: '10–14 Weeks',
        recommendedResources: [
          { name: 'Interactive Industry Project Labs', type: 'Practice' },
          { name: 'LinkedIn Learning Pathway', type: 'Platform' },
        ],
      },
      {
        category: 'Professional Leadership & Communication',
        skills: ['Executive Presentations & Client Pitching', 'Cross-Functional Team Collaboration', 'Regulatory Compliance & Ethics'],
        estimatedWeeks: '6–8 Weeks',
        recommendedResources: [
          { name: 'Harvard Business Review Guides', type: 'Documentation' },
        ],
      },
    ],
    projects: [
      {
        tier: 'Beginner',
        title: `Foundational Case Study & Analysis for ${career.title}`,
        problemStatement: `Benchmark industry challenges and design an optimized workflow standard for entry-level ${career.title} roles.`,
        recommendedTechStack: ['Domain Tools', 'Excel / Analytics', 'Executive Summary Deck'],
        keyFeatures: ['Current-state audit', 'Gap analysis against regulatory guidelines', 'Actionable recommendation matrix'],
        portfolioImpact: 'Proves structured problem-solving and deep theoretical familiarity.',
      },
      {
        tier: 'Intermediate',
        title: `Practical Implementation & Process Optimization Blueprint`,
        problemStatement: `Streamline an existing real-world operational bottleneck to reduce turnaround time and costs.`,
        recommendedTechStack: ['Specialized Software', 'Data Visualization', 'Workflow Engine'],
        keyFeatures: ['Real-world dataset testing', 'Stakeholder alignment blueprint', 'Measurable ROI metric calculation'],
        portfolioImpact: 'Strong demonstration of mid-level domain execution for recruiter shortlists.',
      },
      {
        tier: 'Industry Capstone',
        title: `End-to-End Enterprise Project & Strategic Deliverable`,
        problemStatement: `Design a comprehensive, end-to-end framework solving a major strategic problem in ${career.sector}.`,
        recommendedTechStack: ['Enterprise Suite', 'Full Compliance & Standards Check', 'Executive Presentation'],
        keyFeatures: ['Rigorous stress-testing', 'Executive pitch deck', 'Complete documentation adhering to Indian standards'],
        portfolioImpact: 'Stands out at campus placements and off-campus recruitment drives.',
      },
    ],
    certifications: career.certificationsAndInternships.map((certName, idx) => ({
      name: certName,
      issuingBody: 'Recognized Industry / Regulatory Council',
      level: idx === 0 ? 'Professional' : 'Associate',
      estimatedCost: 'Standard Exam Fees',
      worthScore: idx === 0 ? 'Essential' : 'High ROI',
      whyItMatters: `Standard credential recognized across ${career.sector} employers in India.`,
    })),
    internships: {
      idealTimeline: 'Penultimate Year (Months 24–36 of College / Training)',
      topPlatforms: ['LinkedIn Jobs', 'Internshala', 'Industry Association Networks', 'Campus Placement Cell'],
      keyRequirements: ['Strong academic record', '1 verified practical project / case study', 'Domain-specific software proficiency'],
      stipendRange: '₹15,000 to ₹60,000 / month',
      coldOutreachTemplate: {
        subject: `Application for ${career.title} Internship / Trainee Role`,
        body: `Dear Hiring Manager / Team Lead,\n\nI am currently pursuing my degree preparing for a career as a ${career.title}. Having studied ${career.keySkills.slice(0, 2).join(' and ')}, I recently completed a project focusing on [Brief Project Scope].\n\nI admire [Company Name]'s leadership in [Sector/Domain] and would welcome an opportunity to contribute as an intern. Attached is my portfolio and CV.\n\nWarm regards,\n[Your Name] | [Phone]`,
      },
    },
    resumeGuide: {
      atsGuidelines: [
        'Organize strictly with standard sections: Education, Projects, Skills, Certifications, Experience.',
        'Incorporate quantifiable achievements (Percentages, Team sizes, Cost reductions).',
        'Avoid complex columns or tables that trip up scanning algorithms.',
      ],
      googleXyzExamples: [
        {
          x: `Led key initiative in ${career.title} domain`,
          y: 'delivering 25% efficiency gains and zero compliance violations',
          z: 'by establishing structured review protocols and standardized workflows.',
          fullBullet: `Led key operational analysis in ${career.title} domain, delivering 25% efficiency gains and zero compliance violations across 15+ review cycles.`,
        },
      ],
      actionVerbs: ['Executed', 'Formulated', 'Governed', 'Spearheaded', 'Optimized', 'Evaluated'],
      portfolioMustHaves: ['Case study document', 'Clean 1-page PDF resume', 'Verified credentials links'],
    },
    mockInterviews: [
      {
        question: `What are the core regulatory or operational principles governing ${career.title} in India?`,
        roundType: 'Technical',
        idealAnswerFramework: 'State primary governing bodies -> core legal/technical standards -> practical application in daily workflow.',
        starTip: 'Always cite recent regulatory updates or landmark sector developments.',
      },
      {
        question: 'Describe a situation where you had to manage conflicting stakeholder expectations.',
        roundType: 'HR / Behavioral',
        idealAnswerFramework: 'Situation -> Task -> Action (Communication, compromise, objective data) -> Result.',
        starTip: 'Show emotional intelligence and adherence to professional standards.',
      },
    ],
    placementPrep: {
      timelinePhases: [
        { phase: 'Phase 1: Foundations', duration: 'Months 1–4', focusAreas: ['Core syllabus revision', 'Aptitude & quantitative foundations'] },
        { phase: 'Phase 2: Practical Application', duration: 'Months 5–8', focusAreas: ['Projects & case study building', 'Domain software proficiency'] },
        { phase: 'Phase 3: Placement Sprints', duration: 'Months 9–12', focusAreas: ['Mock interviews', 'Company-specific past papers', 'Soft skills & group discussions'] },
      ],
      aptitudeTopics: ['Logical Reasoning', 'Quantitative Aptitude', 'Verbal Communication', 'Data Interpretation'],
      coreSubjectsToRevise: career.keySkills.slice(0, 4),
      recruitmentRounds: ['Aptitude & Domain Screening Test', 'Technical & Domain Assessment', 'Personal Interview & Culture Fit Round'],
    },
    jobMarket: {
      entryLevelRoles: [`Junior ${career.title}`, `Associate ${career.title}`, 'Management Trainee', 'Graduate Analyst'],
      tier1CTC: career.salaryProspects.entryLevel,
      tier2CTC: 'Competitive Market Standard',
      tier3CTC: 'Regional Standard',
      topHiringCompanies: career.topRecruiters,
      hiringHubs: ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Hyderabad', 'Pune'],
    },
    growthLadder: {
      stages: [
        { title: `Entry-Level ${career.title}`, experienceYears: '0–2 Years', expectedCTC: career.salaryProspects.entryLevel, responsibilities: 'Hands-on execution of daily tasks under senior supervision.', keySkillsToUpgrade: ['Speed & precision', 'Standard operating procedures'] },
        { title: `Senior / Mid-Level ${career.title}`, experienceYears: '3–5 Years', expectedCTC: career.salaryProspects.midLevel, responsibilities: 'Independent project ownership, client interactions, mentoring trainees.', keySkillsToUpgrade: ['Strategic planning', 'Project leadership'] },
        { title: `Lead / Executive / Director`, experienceYears: '6+ Years', expectedCTC: career.salaryProspects.seniorLevel, responsibilities: 'Organizational strategy, top-level decision making, executive responsibility.', keySkillsToUpgrade: ['P&L management', 'Industry governance'] },
      ],
      emergingTrends: ['AI-assisted workflow automation', 'Green & sustainable practices', 'Cross-border digital collaboration'],
    },
    checklistItems: [
      { id: `${career.id}-chk-1`, stageName: 'Skill Learning', title: `Acquire Core Skills in ${career.title}`, description: 'Complete key foundational courses and technical readings.' },
      { id: `${career.id}-chk-2`, stageName: 'Projects', title: 'Complete 1 Capstone Project / Industry Case Study', description: 'Build a comprehensive portfolio piece demonstrating practical proficiency.' },
      { id: `${career.id}-chk-3`, stageName: 'Certifications', title: 'Obtain Recognized Domain Certification', description: 'Validate skills with an authoritative certification.' },
      { id: `${career.id}-chk-4`, stageName: 'Internships', title: 'Secure an Internship / Practical Traineeship', description: 'Gain on-the-job training in a professional setting.' },
      { id: `${career.id}-chk-5`, stageName: 'Resume & Portfolio', title: 'Draft ATS-Compliant 1-Page Resume', description: 'Highlight measurable outcomes using action verbs.' },
      { id: `${career.id}-chk-6`, stageName: 'Mock Interview', title: 'Practice Domain & HR Interview Questions', description: 'Rehearse key technical answers and behavioral STAR narratives.' },
    ],
  };
}
