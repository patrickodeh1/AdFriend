import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion"; // For animations

// Expanded widgets array with more types of content
const widgets = [
    { type: "Motivation", content: "You got this! Keep pushing forward! 💪" },
    { type: "Motivation", content: "Success is just around the corner. Keep moving! 🚀" },
    { type: "Motivation", content: "Believe in yourself. You are stronger than you think! 🌟" },
    { type: "Fun Fact", content: "Octopuses have three hearts! 🐙" },
    { type: "Break Timer", content: "Time for a quick stretch! ⏳" },
    { type: "Mindfulness", content: "Take a deep breath and relax. 🌿" },
    { type: "Daily Challenge", content: "Avoid social media for 2 hours! ⏳" },
    { type: "Mini Trivia", content: "What year was JavaScript created?", options: ["1995", "2005", "2015"] },
    { type: "Coding Tips", content: "Use '===' instead of '==' for strict comparison in JavaScript!" },
    { type: "Quote", content: "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt" },
    { type: "Joke", content: "Why don't programmers like nature? It has too many bugs! 🐛" },
    { type: "Health Tip", content: "Take a 5-minute walk every hour to stay active! 🚶‍♂️" },
];

const AdReplacementWidget = ({ interval = 30000 }) => {
    const [currentWidget, setCurrentWidget] = useState(null);
    const [pollResponse, setPollResponse] = useState(null);
    const intervalRef = useRef(null);

    // Function to update the widget with a random selection
    const updateWidget = useCallback(() => {
        const randomWidget = widgets[Math.floor(Math.random() * widgets.length)];
        const widgetWithTimestamp = { ...randomWidget, timestamp: Date.now() };
        setCurrentWidget(widgetWithTimestamp);
        localStorage.setItem("lastWidget", JSON.stringify(widgetWithTimestamp)); // Store last widget with timestamp
    }, []);

    useEffect(() => {
        // Check localStorage for a stored widget and its expiry
        const storedWidget = localStorage.getItem("lastWidget");
        if (storedWidget) {
            const parsedWidget = JSON.parse(storedWidget);
            const isExpired = Date.now() - parsedWidget.timestamp > 3600000; // 1 hour expiry
            if (!isExpired) {
                setCurrentWidget(parsedWidget);
            } else {
                updateWidget();
            }
        } else {
            updateWidget();
        }

        // Set interval to update the widget
        intervalRef.current = setInterval(updateWidget, interval);
        return () => clearInterval(intervalRef.current);
    }, [updateWidget, interval]);

    // Function to handle poll responses
    const handlePollResponse = (response) => {
        setPollResponse(response);
        setTimeout(() => setPollResponse(null), 5000); // Clear poll response after 5 seconds
    };

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

                    {/* Display options for trivia widgets */}
                    {currentWidget.options && (
                        <div className="poll mt-4">
                            <p className="font-semibold">Which one do you prefer?</p>
                            {currentWidget.options.map((option, index) => (
                                <button
                                    key={index}
                                    className="poll-btn bg-blue-500 text-white px-4 py-2 m-2 rounded transition hover:bg-blue-600"
                                    onClick={() => handlePollResponse(`Option ${String.fromCharCode(65 + index)}`)}
                                    aria-label={`Select ${option}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Display poll response */}
            {pollResponse && (
                <motion.div
                    className="mt-3 text-green-600 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {pollResponse === "Option A"
                        ? "Great choice! You must love efficiency! 🚀"
                        : "Nice pick! That shows creativity! 🎨"}
                </motion.div>
            )}
        </motion.div>
    );
};

export default AdReplacementWidget;