// src/app/loading.js

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[380] flex flex-col items-center justify-center bg-white">
      {/* Loader */}
      <div className="envasesbh-loader">
        <div className="sq" />
        <div className="sq" />
        <div className="sq" />
        <div className="sq" />
      </div>

      {/* Texto */}
      <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
        Envases BH
      </p>

      <style>{`
        .envasesbh-loader {
          width: 48px;
          height: 48px;
          position: relative;
          animation: rotate 1.6s linear infinite;
        }
        .envasesbh-loader .sq {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 3px;
          background: var(--color-primary);
        }
        .envasesbh-loader .sq:nth-child(1) {
          top: 0; left: 0;
          transform-origin: bottom right;
          animation: spread-tl 1.6s ease-in-out infinite;
        }
        .envasesbh-loader .sq:nth-child(2) {
          top: 0; right: 0;
          transform-origin: bottom left;
          animation: spread-tr 1.6s ease-in-out infinite;
        }
        .envasesbh-loader .sq:nth-child(3) {
          bottom: 0; left: 0;
          transform-origin: top right;
          animation: spread-bl 1.6s ease-in-out infinite;
        }
        .envasesbh-loader .sq:nth-child(4) {
          bottom: 0; right: 0;
          transform-origin: top left;
          animation: spread-br 1.6s ease-in-out infinite;
        }

        @keyframes rotate {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spread-tl {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(-6px, -6px); }
          50%      { transform: translate(-6px, -6px); }
          75%      { transform: translate(0, 0); }
        }
        @keyframes spread-tr {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(6px, -6px); }
          50%      { transform: translate(6px, -6px); }
          75%      { transform: translate(0, 0); }
        }
        @keyframes spread-bl {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(-6px, 6px); }
          50%      { transform: translate(-6px, 6px); }
          75%      { transform: translate(0, 0); }
        }
        @keyframes spread-br {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(6px, 6px); }
          50%      { transform: translate(6px, 6px); }
          75%      { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
