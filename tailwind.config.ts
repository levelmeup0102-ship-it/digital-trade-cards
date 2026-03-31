import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard Variable', 'Pretendard', '-apple-system', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.35s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'flip': 'flip 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
