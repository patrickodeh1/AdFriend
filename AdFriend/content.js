import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion"; // For animations

const widgets = [
    { type: "Motivation", content: "You got this! Keep pushing forward! 💪" },
    { type: "Motivation", content: "Success is just around the corner. Keep moving! 🚀" },
    { type: "Motivation", content: "Believe in yourself. You are stronger than you think! 🌟" },
    { type: "Fun Fact", content: "Octopuses have three hearts! 🐙" },
    { type: "Break Timer", content: "Time for a quick stretch! ⏳" },
    { type: "Mindfulness", content: "Take a deep breath and relax. 🌿" },
    { type: "Daily Challenge", content: "Avoid social media for 2 hours! ⏳" },
    { type: "Mini Trivia", content: "What year was JavaScript created? A) 1995 B) 2005 C) 2015" },
    { type: "Coding Tips", content: "Use '===’ instead of '==' for strict comparison in JavaScript!" },
];

const AdReplacementWidget = () => {
    const [currentWidget, setCurrentWidget] = useState(null);
    const [pollResponse, setPollResponse] = useState(null);
    const intervalRef = useRef(null);

    const updateWidget = useCallback(() => {
        const randomWidget = widgets[Math.floor(Math.random() * widgets.length)];
        setCurrentWidget(randomWidget);
        localStorage.setItem("lastWidget", JSON.stringify(randomWidget)); // Store last widget
    }, []);

    useEffect(() => {
        const storedWidget = localStorage.getItem("lastWidget");
        if (storedWidget) {
            setCurrentWidget(JSON.parse(storedWidget));
        } else {
            updateWidget();
        }

        intervalRef.current = setInterval(updateWidget, 30000);
        return () => clearInterval(intervalRef.current);
    }, [updateWidget]);

    return (
        <motion.div 
            className="widget-container border p-4 rounded-lg shadow-md bg-white text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {currentWidget && (
                <>
                    <h3 className="font-bold text-lg mb-2">{currentWidget.type}</h3>
                    <p className="text-gray-700">{currentWidget.content}</p>
                </>
            )}

            <div className="poll mt-4">
                <p className="font-semibold">Which one do you prefer?</p>
                <button 
                    className="poll-btn bg-blue-500 text-white px-4 py-2 m-2 rounded transition hover:bg-blue-600"
                    onClick={() => setPollResponse("Option A")}
                >
                    Option A
                </button>
                <button 
                    className="poll-btn bg-green-500 text-white px-4 py-2 m-2 rounded transition hover:bg-green-600"
                    onClick={() => setPollResponse("Option B")}
                >
                    Option B
                </button>
            </div>

            {pollResponse && (
                <motion.div 
                    className="mt-3 text-green-600 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {pollResponse === "Option A" ? "Great choice! You must love efficiency! 🚀" : "Nice pick! That shows creativity! 🎨"}
                </motion.div>
            )}
        </motion.div>
    );
};

export default AdReplacementWidget;
