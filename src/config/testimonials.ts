export interface InstitutionRating {
  name: string;
  location: string;
  rating: number; // e.g. 4.9
}

export interface CourseTestimonial {
  name: string;
  rating: number; // e.g. 4.8
  affiliation: string;
  content: string;
}

export const INSTITUTIONS_DELIVERED: InstitutionRating[] = [
  {
    name: "Karunya Institute of Technology and Sciences",
    location: "Coimbatore",
    rating: 4.9,
  },
  {
    name: "Dhanalakshmi Srinivasan University",
    location: "Tiruchirappalli",
    rating: 4.8,
  },
  {
    name: "Ramco Institute of Technology",
    location: "Rajapalayam",
    rating: 4.6,
  },
  {
    name: "Roever Engineering College",
    location: "Perambalur",
    rating: 4.7,
  },
  {
    name: "Bon Secours College for Women",
    location: "Thanjavur",
    rating: 4.5,
  },
  {
    name: "St. Antony’s Higher Secondary School",
    location: "Thanjavur",
    rating: 4.8,
  },
];

export const COURSE_TESTIMONIALS: Record<string, CourseTestimonial[]> = {
  "artificial-intelligence": [
    {
      name: "Bharathi",
      rating: 4.8,
      affiliation: "Ramco Institute of Technology (RIT), Rajapalayam",
      content:
        "The 30-day AI Foundation & Productivity training at JBM was a valuable learning experience. The hands-on sessions helped me understand AI tools and use them effectively in practical tasks.",
    },
    {
      name: "Keerthana",
      rating: 4.9,
      affiliation: "Ramco Institute of Technology (RIT), Rajapalayam",
      content:
        "JBM provided practical exposure to AI tools through engaging sessions and hands-on activities. The program helped me improve my AI knowledge and productivity skills.",
    },
    {
      name: "Dhinesh",
      rating: 4.8,
      affiliation: "Ramco Institute of Technology (RIT), Rajapalayam",
      content:
        "The training gave me a better understanding of AI and its practical applications. I gained useful hands-on experience and learned how AI tools can simplify everyday tasks.",
    },
    {
      name: "Priya",
      rating: 4.9,
      affiliation: "Ramco Institute of Technology (RIT), Rajapalayam",
      content:
        "My experience with JBM was informative and practical. The 30-day program introduced me to useful AI tools and helped me build confidence in using AI for productivity.",
    },
    {
      name: "Sindhu",
      rating: 4.8,
      affiliation: "Ramco Institute of Technology (RIT), Rajapalayam",
      content:
        "The AI Foundation & Productivity program was a great learning opportunity. The practical sessions helped me explore AI tools and understand their importance in academics and career development.",
    },
  ],
  "cyber-security": [
    {
      name: "Dhanush",
      rating: 4.8,
      affiliation:
        "Sri Krishna College of Engineering and Technology (SKCET), Coimbatore",
      content:
        "The Networking in Cyber Security program at JBM helped me understand networking fundamentals and their importance in cybersecurity. The practical learning approach made the sessions engaging and useful.",
    },
    {
      name: "Venkatesh",
      rating: 4.9,
      affiliation: "Dhanalakshmi Srinivasan University, Trichy",
      content:
        "JBM’s training provided valuable insights into computer networking and cybersecurity concepts. The sessions helped me strengthen my technical foundation and understand real-world applications.",
    },
    {
      name: "Sabari",
      rating: 4.8,
      affiliation: "Dhanalakshmi Srinivasan University, Trichy",
      content:
        "The program offered a useful introduction to networking concepts in cybersecurity. I gained a better understanding of network fundamentals and their role in protecting digital systems.",
    },
    {
      name: "Manoj",
      rating: 4.9,
      affiliation: "Dhanalakshmi Srinivasan University, Trichy",
      content:
        "The Networking in Cyber Security training was an informative learning experience. The practical approach helped me explore networking concepts and understand their importance in building a cybersecurity career.",
    },
    {
      name: "Suresh",
      rating: 4.8,
      affiliation:
        "Sri Krishna College of Engineering and Technology (SKCET), Coimbatore",
      content:
        "JBM helped me build a stronger foundation in networking and cybersecurity. The training introduced essential concepts and gave me a clearer understanding of how networks support information security.",
    },
  ],
  english: [
    {
      name: "Jaya",
      rating: 4.8,
      affiliation: "Institution Participant",
      content:
        "JBM has helped me improve my English communication skills and speak with greater confidence. The sessions have been very useful for my academic and personal growth.",
    },
    {
      name: "Bavani",
      rating: 4.7,
      affiliation: "Institution Participant",
      content:
        "The program has helped me improve my spoken English and express my thoughts more confidently. I am happy with my learning experience at JBM.",
    },
    {
      name: "Rani",
      rating: 4.6,
      affiliation: "Institution Participant",
      content:
        "JBM has provided a supportive environment to practise English and improve my communication skills. I feel more confident speaking English than before.",
    },
    {
      name: "Karthi",
      rating: 4.8,
      affiliation: "Industry Professional",
      content:
        "The training has helped me improve my English-speaking skills and communicate more confidently in professional situations. The practice sessions have been valuable.",
    },
    {
      name: "Vairam",
      rating: 4.7,
      affiliation: "Police Professional, Chennai",
      content:
        "JBM’s English communication training has helped me improve my spoken English and express myself more confidently. The sessions have been a valuable learning experience.",
    },
    {
      name: "Mohan Raj",
      rating: 4.5,
      affiliation: "Industry Professional",
      content:
        "I have noticed a positive improvement in my English communication through JBM’s training. The sessions encourage me to practise regularly and communicate more effectively.",
    },
    {
      name: "G. Selva",
      rating: 4.6,
      affiliation: "Industry Professional",
      content:
        "The program has helped me develop my English-speaking skills and build confidence in everyday professional conversations. It has been a useful learning experience.",
    },
    {
      name: "Rathinam",
      rating: 4.8,
      affiliation: "Industry Professional",
      content:
        "JBM has helped me become more comfortable speaking English and communicating with others. The regular practice sessions have supported my improvement.",
    },
    {
      name: "Sriram",
      rating: 4.7,
      affiliation: "Industry Professional",
      content:
        "My English communication skills have improved through the training sessions. I feel more confident expressing my thoughts and using English in professional situations.",
    },
  ],
};
