-- ==============================================================================
-- seed.sql
-- Seed data for Cyber Security, English, and Artificial Intelligence courses
-- ==============================================================================

INSERT INTO public.courses (
    id,
    slug,
    title,
    short_description,
    description,
    fee,
    currency,
    duration,
    level,
    intro_video_url,
    thumbnail_url,
    is_active,
    syllabus,
    learning_outcomes,
    prerequisites,
    target_audience
) VALUES
(
    'a1111111-1111-1111-1111-111111111111',
    'cyber-security',
    'Cyber Security & Ethical Hacking',
    'Master practical network defense, vulnerability assessment, ethical penetration testing, and modern digital asset security.',
    'A comprehensive, hands-on immersion into modern cybersecurity practices. You will learn offensive and defensive tactics, secure infrastructure design, threat modeling, incident response, and industry-standard tooling like Wireshark, Metasploit, Burp Suite, and Linux security auditing.',
    4999,
    'INR',
    '10 Weeks (Live + Lab)',
    'Beginner to Intermediate',
    'https://www.youtube.com/watch?v=inWWhr5tnEA',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    true,
    '[
        {"week": "Week 1-2", "title": "Fundamentals of Networking & Linux OS", "topics": ["TCP/IP, DNS, OSI Model", "Essential Linux command line & bash scripting", "Network reconnaissance with Nmap & Wireshark"]},
        {"week": "Week 3-4", "title": "Vulnerability Assessment & Web Security", "topics": ["OWASP Top 10 vulnerabilities", "SQL Injection, XSS, and CSRF exploitation & mitigation", "Burp Suite intercepting and proxying"]},
        {"week": "Week 5-6", "title": "System Penetration Testing", "topics": ["Metasploit framework workflows", "Privilege escalation techniques (Linux & Windows)", "Password auditing and hash cracking"]},
        {"week": "Week 7-8", "title": "Defensive Security & Incident Response", "topics": ["SIEM systems (Splunk / Elastic Security)", "Log analysis and intrusion detection", "Firewall rules & perimeter hardening"]},
        {"week": "Week 9-10", "title": "Cloud Security, Compliance & Capstone", "topics": ["AWS/Cloud identity and IAM posture", "Industry certifications roadmaps (CompTIA Security+, CEH)", "Live simulated red/blue team capstone lab"]}
    ]'::jsonb,
    '[
        "Perform comprehensive network and web application penetration tests safely and ethically",
        "Identify and patch critical vulnerabilities in production web applications",
        "Analyze security incidents and formulate response protocols with SIEM tooling",
        "Design hardened network architectures resisting malware, phishing, and DDoS attacks"
    ]'::jsonb,
    '[
        "Basic computer literacy and comfort with navigating operating systems",
        "No prior coding experience strictly required, basic logic comprehension recommended"
    ]'::jsonb,
    '[
        "Aspiring security analysts, ethical hackers, and IT professionals",
        "Developers aiming to build secure applications and master DevSecOps",
        "Students seeking high-demand cybersecurity career certifications"
    ]'::jsonb
),
(
    'b2222222-2222-2222-2222-222222222222',
    'english',
    'Professional English & Global Communication',
    'Develop confident spoken fluency, executive business writing, global presentation skills, and professional interview mastery.',
    'Engineered for students, career transitioners, and working professionals who want to articulate ideas clearly, persuasively, and with authentic confidence. Covers advanced conversational agility, email etiquette, executive presentations, boardroom dialogue, and accent neutralisation.',
    2999,
    'INR',
    '8 Weeks (Interactive Workshops)',
    'All Levels',
    'https://www.youtube.com/watch?v=juKd26qkNAw',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
    true,
    '[
        {"week": "Week 1-2", "title": "Fluency Foundations & Vocal Dynamics", "topics": ["Overcoming hesitation and anxiety in public speech", "Pronunciation clarity and rhythm", "Active vocabulary expansion strategies"]},
        {"week": "Week 3-4", "title": "Business Writing & Digital Correspondence", "topics": ["High-impact emails, proposals, and project reports", "Tone calibration for diverse international audiences", "Grammar refinement and succinct communication"]},
        {"week": "Week 5-6", "title": "Executive Presentation & Storytelling", "topics": ["Structuring compelling business pitches and slide decks", "Body language, posture, and virtual camera presence", "Handling spontaneous Q&A and objections"]},
        {"week": "Week 7-8", "title": "Interview Mastery & Negotiation", "topics": ["STAR method behavioral interview practice", "Salary negotiation and professional diplomacy", "Mock interviews with 1-on-1 personalized feedback"]}
    ]'::jsonb,
    '[
        "Speak fluently and authoritatively in formal and informal workplace scenarios",
        "Draft polished business emails, executive summaries, and technical memos",
        "Deliver captivating presentations with structured storytelling and persuasive impact",
        "Excel in competitive corporate interviews and client negotiations"
    ]'::jsonb,
    '[
        "Basic reading and writing capability in English",
        "Eagerness to participate in live speaking exercises and interactive drills"
    ]'::jsonb,
    '[
        "Software engineers and tech professionals preparing for global client interactions",
        "Graduates aiming to clear campus recruitment interviews",
        "Managers and team leads aiming to amplify their executive presence"
    ]'::jsonb
),
(
    'c3333333-3333-3333-3333-333333333333',
    'artificial-intelligence',
    'Artificial Intelligence & Applied Machine Learning',
    'Build and deploy real-world AI models, Generative AI pipelines, LLM agents, and scalable machine learning solutions.',
    'A project-driven curriculum bridging core machine learning mathematics with cutting-edge Generative AI engineering. Build computer vision classifiers, NLP sentiment engines, Retrieval-Augmented Generation (RAG) applications with LangChain / LlamaIndex, and deploy models as production-grade web APIs.',
    5999,
    'INR',
    '12 Weeks (Hands-on Coding)',
    'Beginner to Advanced',
    'https://www.youtube.com/watch?v=JMUxmLyrhSk',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    true,
    '[
        {"week": "Week 1-3", "title": "Python for Data Science & Math Foundations", "topics": ["NumPy, Pandas, Matplotlib, and Seaborn for EDA", "Linear algebra, calculus, and probability for ML", "Data cleaning, feature engineering, and preprocessing"]},
        {"week": "Week 4-6", "title": "Classical Machine Learning Algorithms", "topics": ["Regression, Classification, and Clustering algorithms", "Scikit-Learn pipelines, Cross-Validation, Hyperparameter tuning", "Ensemble methods: Random Forests, XGBoost, LightGBM"]},
        {"week": "Week 7-9", "title": "Deep Learning & Neural Networks", "topics": ["PyTorch fundamentals and tensor operations", "Convolutional Neural Networks (CNNs) for Computer Vision", "Transformers architecture and attention mechanisms"]},
        {"week": "Week 10-12", "title": "Generative AI, RAG & Production Deployment", "topics": ["Prompt engineering and fine-tuning Open-Source LLMs", "Building RAG systems with vector databases (Pinecone / Chroma)", "Deploying AI microservices via FastAPI, Docker, and Cloud Endpoints"]}
    ]'::jsonb,
    '[
        "Build, evaluate, and fine-tune supervised and unsupervised ML models",
        "Develop deep learning pipelines using PyTorch for vision and language tasks",
        "Architect production-ready Generative AI and RAG applications with vector DBs",
        "Deploy containerized AI solutions to scalable cloud environments"
    ]'::jsonb,
    '[
        "Basic programming knowledge (Python familiarity helpful but taught in Week 1)",
        "High school level mathematics (algebra and basic statistics)"
    ]'::jsonb,
    '[
        "Software developers and data analysts transitioning into AI/ML engineering",
        "Product managers, founders, and students wanting practical AI implementation skills",
        "Tech enthusiasts eager to build custom LLM-powered applications"
    ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    fee = EXCLUDED.fee,
    currency = EXCLUDED.currency,
    duration = EXCLUDED.duration,
    level = EXCLUDED.level,
    intro_video_url = EXCLUDED.intro_video_url,
    thumbnail_url = EXCLUDED.thumbnail_url,
    is_active = EXCLUDED.is_active,
    syllabus = EXCLUDED.syllabus,
    learning_outcomes = EXCLUDED.learning_outcomes,
    prerequisites = EXCLUDED.prerequisites,
    target_audience = EXCLUDED.target_audience,
    updated_at = NOW();
