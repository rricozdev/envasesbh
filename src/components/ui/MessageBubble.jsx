export const MessageBubble = ({ msg }) => {
  const isBot = msg.sender === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
          isBot
            ? "bg-gray-100 text-gray-800 rounded-tl-none"
            : "bg-primary text-white rounded-tr-none"
        }`}
      >
        {msg.text}
        {msg.cta && (
          <a href={msg.cta.link} className="block mt-2 underline font-bold">
            {msg.cta.label}
          </a>
        )}
      </div>
    </div>
  );
};
