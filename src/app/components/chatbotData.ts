export type ChatbotQA = {
  id: string;
  question: string;
  answer: string;
};

export const chatbotQuestions: ChatbotQA[] = [
  {
    id: "about-me",
    question: "Who is Tasmia and what does she do?",
    answer:
      "Tasmia is a passionate Software Quality Assurance (SQA) Engineer focused on ensuring smooth, reliable, and user‑friendly experiences across web applications.",
  },
  {
    id: "skills",
    question: "What technical skills does Tasmia have?",
    answer:
      "Tasmia works with modern testing practices and tools, and collaborates closely with developers and stakeholders to ship high‑quality releases. Explore the Skills and Projects sections to see more details.",
  },
  {
    id: "services",
    question: "How can Tasmia help on a project?",
    answer:
      "She can help with test planning, test case design, manual and exploratory testing, regression testing, and ensuring that user flows are intuitive and bug‑free before release.",
  },
  {
    id: "projects",
    question: "Where can I see Tasmia’s projects?",
    answer:
      "You can browse the Projects section of this portfolio to see highlighted work, responsibilities, and impact on real products.",
  },
  {
    id: "contact",
    question: "How can I contact Tasmia?",
    answer:
      "You can reach out using the contact section of this portfolio. Just fill in the form and she will get back to you as soon as possible.",
  },
];

