/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

// Simple icons using text or emoji
const SchoolIcon = () => <div className="text-2xl">🏫</div>;
const UniversityIcon = () => <div className="text-2xl">🎓</div>;
const GraduationIcon = () => <div className="text-2xl">🎓</div>;
const AwardIcon = () => <div className="text-2xl">🏆</div>;

// Define types for the props of TimelineElement
interface TimelineElementProps {
  date: string;
  position: any;
  children: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  iconBackground: string;
  icon: React.ReactNode;
  onClick: () => void;
  isVisible: boolean;
}

// Custom Timeline Component
const TimelineElement: React.FC<TimelineElementProps> = ({
  date,
  position,
  children,
  gradientFrom,
  gradientTo,
  iconBackground,
  icon,
  onClick,
  isVisible,
}) => {
  return (
    <div
      className={`mb-12 flex ${
        position === "left" ? "flex-row-reverse" : "flex-row"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
      }}
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center mx-4">
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: iconBackground }}
          >
            {icon}
          </div>
        </div>
        <div className="w-1 bg-green-400 grow my-2"></div>
      </div>

      {/* Content */}
      <div
        className={`w-full ${
          position === "left" ? "text-right pr-4" : "text-left pl-4"
        }`}
      >
        <div
          className="p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
          style={{
            background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            maxWidth: "500px",
            width: "100%",
            margin: position === "left" ? "0 0 0 auto" : "0 auto 0 0",
          }}
          onClick={onClick}
        >
          {children}
        </div>
        <div
          className={`mt-2 text-green-400 font-medium ${
            position === "left" ? "pr-12" : "pl-12"
          }`}
        >
          {date}
        </div>
      </div>
    </div>
  );
};

const EducationTimeline = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [visibleElements, setVisibleElements] = useState<number[]>([]);

  React.useEffect(() => {
    // Simulate the animation by gradually revealing elements
    const timeout = setTimeout(() => {
      setVisibleElements([1, 2, 3, 4, 5]);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  // Education data
  const educationData = [
    {
      id: 1,
      title: "BSc (Hons) in Zoology",
      institution: "Sherpur Govt College, National University",
      period: "2023 - Present",
      description:
        "Pursuing specialization in Zoology while developing innovative solutions to real-world problems. Dedicated to academic excellence and professional growth.",
      achievements: [
        "Dean's List for academic excellence",
        "Research project on local ecosystem conservation",
        "Member of the Biology Association",
      ],
      color: "#4caf50",
      gradientFrom: "#388e3c",
      gradientTo: "#4caf50",
      icon: <UniversityIcon />,
      position: "right",
    },
    {
      id: 2,
      title: "Higher Secondary School Certificate",
      institution: "Nizam Uddin Ahmed Model College",
      period: "2020 - 2022",
      description:
        "Introduced to the fascinating world of web development, starting with HTML & CSS. This was the beginning of my coding journey.",
      achievements: [
        "Science Club president",
        "Winner of district science competition",
        "Completed programming fundamentals course",
      ],
      color: "#f57f17",
      gradientFrom: "#785B15",
      gradientTo: "#f57f17",
      icon: <SchoolIcon />,
      position: "left",
    },
    {
      id: 3,
      title: "Secondary School Certificate",
      institution: "Sherpur Govt Victory Academy",
      period: "2018 - 2020",
      description:
        "Started exploring programming and building my passion for technology. A quick learner and eager to experiment with new ideas.",
      achievements: [
        "Class representative",
        "Computer Science Club member",
        "Top 5% in final examinations",
      ],
      color: "#1976d2",
      gradientFrom: "#092D48",
      gradientTo: "#1976d2",
      icon: <SchoolIcon />,
      position: "right",
    },
  ];

  // Handle detail view click
  const handleElementClick = (id: any) => {
    setSelectedElement(selectedElement === id ? null : id);
  };

  return (
    <section className="bg-gray-900 text-white py-10 px-5">
      {/* Heading Section */}
      <div
        className="text-center mb-10"
        style={{
          opacity: visibleElements.includes(1) ? 1 : 0,
          transform: visibleElements.includes(1) ? "scale(1)" : "scale(0.8)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <h2 className="text-4xl md:text-4xl font-bold mb-3 text-green-400">
          Educational Journey
        </h2>

        <div className="flex justify-center mt-4">
          <div className="h-1 w-24 bg-green-400 rounded-full"></div>
        </div>
      </div>

      {/* Custom Timeline */}
      <div className="container mx-auto max-w-4xl relative">
        {/* Center line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-green-400 transform -translate-x-1/2"></div>

        {educationData.map((item, index) => (
          <TimelineElement
            key={item.id}
            date={item.period}
            position={item.position}
            gradientFrom={item.gradientFrom}
            gradientTo={item.gradientTo}
            iconBackground={item.color}
            icon={item.icon}
            onClick={() => handleElementClick(item.id)}
            isVisible={visibleElements.includes(index + 2)}
          >
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            <h4 className="text-xl font-light mb-3 text-white opacity-90">
              {item.institution}
            </h4>
            <p className="text-sm text-white opacity-90">{item.description}</p>

            {/* Achievements that show on click */}
            {selectedElement === item.id && (
              <div className="mt-4 pt-4 border-t border-white border-opacity-30">
                <h5 className="font-medium mb-2 flex items-center text-white">
                  <span className="mr-2">
                    <AwardIcon />
                  </span>
                  Key Achievements
                </h5>
                <ul className="list-disc pl-5 space-y-1">
                  {item.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-white">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3 text-xs text-right text-white opacity-70">
              {selectedElement === item.id
                ? "Click to collapse"
                : "Click to see achievements"}
            </div>
          </TimelineElement>
        ))}

        {/* Final element - Future education */}
        <div
          className="flex justify-center mb-8"
          style={{
            opacity: visibleElements.includes(5) ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
            transitionDelay: "0.6s",
          }}
        >
          <div className="w-16 h-16 z-50 rounded-full bg-purple-600 flex items-center justify-center">
            <GraduationIcon />
          </div>
        </div>
        <div
          className="text-center mb-16 z-50"
          style={{
            opacity: visibleElements.includes(5) ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
            transitionDelay: "0.8s",
          }}
        >
          <h3 className="text-lg font-semibold">Continuing Education</h3>
          <p className="text-sm text-gray-300">
            Looking forward to future learning opportunities
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationTimeline;
