import React from "react";

interface NusaLogoProps {
  className?: string;
  size?: number;
}

export default function NusaLogo({ className = "", size = 200 }: NusaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Shadow filter for depth */}
        <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#5c3821" floodOpacity="0.15" />
        </filter>

        {/* Text curves */}
        {/* Top curve path (clockwise, from left to right) */}
        <path
          id="text-path-top"
          d="M 65 250 A 185 185 0 0 1 435 250"
          fill="none"
        />
        {/* Bottom curve path (clockwise, from left to right but inverted so text reads left-to-right) */}
        <path
          id="text-path-bottom"
          d="M 435 250 A 185 185 0 0 1 65 250"
          fill="none"
        />
      </defs>

      {/* Ambient background glow if inside a card */}
      <circle cx="250" cy="250" r="235" fill="#FDFBF7" />

      {/* Inner Shadow Circle */}
      <circle cx="250" cy="250" r="235" fill="none" stroke="#D3B89F" strokeWidth="1" />

      {/* Main outer border */}
      <circle cx="250" cy="250" r="225" fill="none" stroke="#5c3821" strokeWidth="6" />

      {/* Dashed inner circle */}
      <circle cx="250" cy="250" r="215" fill="none" stroke="#5c3821" strokeWidth="2" strokeDasharray="6,4" />

      {/* Thick solid inner border defining text area */}
      <circle cx="250" cy="250" r="172" fill="none" stroke="#5c3821" strokeWidth="3" />
      <circle cx="250" cy="250" r="166" fill="none" stroke="#5c3821" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Curved Text - Top: FEITO COM CARINHO */}
      <text
        fontFamily="'Outfit', 'Inter', sans-serif"
        fontSize="21"
        fontWeight="800"
        fill="#5c3821"
        letterSpacing="3.5"
      >
        <textPath href="#text-path-top" startOffset="50%" textAnchor="middle">
          FEITO COM CARINHO
        </textPath>
      </text>

      {/* Curved Text - Bottom: SEM CONSERVANTES OU GLÚTEN */}
      <text
        fontFamily="'Outfit', 'Inter', sans-serif"
        fontSize="17.5"
        fontWeight="800"
        fill="#5c3821"
        letterSpacing="3"
      >
        <textPath href="#text-path-bottom" startOffset="50%" textAnchor="middle">
          SEM CONSERVANTES OU GLÚTEN
        </textPath>
      </text>

      {/* Top and bottom text-divider dots/stars */}
      <circle cx="58" cy="250" r="5" fill="#A4161A" />
      <circle cx="442" cy="250" r="5" fill="#A4161A" />
      
      {/* Small decorative hearts on sides */}
      <path d="M 52,238 C 48,232 40,232 40,238 C 40,244 52,250 52,250 C 52,250 64,244 64,238 C 64,232 56,232 52,238 Z" fill="#A4161A" transform="scale(0.8) translate(50, 60)" />
      <path d="M 448,238 C 444,232 436,232 436,238 C 436,244 448,250 448,250 C 448,250 460,244 460,238 C 460,232 452,232 448,238 Z" fill="#A4161A" transform="scale(0.8) translate(105, 60)" />

      {/* Central Content Area (clipping to inner circle radius 166) */}
      <g>
        {/* Landscape drawing at the bottom */}
        <g id="landscape" opacity="0.85">
          {/* Sky background inside landscape */}
          <path d="M 120,290 C 120,290 150,230 250,230 C 350,230 380,290 380,290 Z" fill="#FFFBF2" opacity="0.4" />
          
          {/* Sun Rays */}
          <g stroke="#E9C46A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round">
            <line x1="250" y1="260" x2="250" y2="230" />
            <line x1="250" y1="260" x2="220" y2="240" />
            <line x1="250" y1="260" x2="280" y2="240" />
            <line x1="250" y1="260" x2="195" y2="255" />
            <line x1="250" y1="260" x2="305" y2="255" />
            <line x1="250" y1="260" x2="185" y2="275" />
            <line x1="250" y1="260" x2="315" y2="275" />
          </g>
          
          {/* Sun circle */}
          <circle cx="250" cy="270" r="16" fill="#F4A261" opacity="0.8" />
          
          {/* Soft rolling hills */}
          <path d="M 110,320 C 150,285 210,290 260,310 C 310,330 360,290 390,320 L 390,380 L 110,380 Z" fill="#E2D4C1" />
          <path d="M 100,340 C 160,300 230,310 290,340 C 350,370 380,330 400,350 L 400,380 L 100,380 Z" fill="#D3C3AD" />

          {/* Little farm house */}
          <rect x="238" y="295" width="24" height="15" fill="#8C6239" />
          <polygon points="234,295 250,282 266,295" fill="#5c3821" />
          <rect x="248" y="302" width="5" height="8" fill="#FDFBF7" /> {/* door */}
          <circle cx="250" cy="289" r="1.5" fill="#FDFBF7" /> {/* window */}

          {/* Miniature trees */}
          {/* Tree 1 */}
          <path d="M 205,310 C 195,290 225,290 215,310 Z" fill="#2D6A4F" />
          <rect x="208" y="310" width="3" height="10" fill="#5c3821" />
          {/* Tree 2 */}
          <path d="M 285,322 C 275,305 305,305 295,322 Z" fill="#1B4332" />
          <rect x="288" y="322" width="3.5" height="12" fill="#5c3821" />
        </g>

        {/* Vintage Jam Jar - Placement above the landscape */}
        <g id="jam-jar" transform="translate(0, -10)" filter="url(#logo-shadow)">
          {/* Jar shadow */}
          <rect x="205" y="115" width="90" height="95" rx="15" fill="#5c3821" opacity="0.1" />

          {/* Jar glass body */}
          <rect x="202" y="110" width="96" height="100" rx="20" fill="#FFF" opacity="0.9" stroke="#5c3821" strokeWidth="4" />
          
          {/* Jam filling (Red delicious strawberry jam gradient) */}
          <rect x="208" y="125" width="84" height="78" rx="12" fill="url(#jam-gradient)" />
          
          {/* Glass glare highlight */}
          <path d="M 215,130 Q 212,160 215,190" stroke="#FFF" strokeWidth="4" strokeLinecap="round" opacity="0.4" fill="none" />
          <path d="M 224,132 Q 222,150 224,170" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.2" fill="none" />

          {/* Checkered fabric lid */}
          {/* Fabric lid base shape */}
          <path d="M 185,108 C 185,100 200,85 250,85 C 300,85 315,100 315,108 C 315,115 305,118 250,118 C 195,118 185,115 185,108 Z" fill="#FFF" stroke="#5c3821" strokeWidth="3" />
          
          {/* Red checkers overlay */}
          <g opacity="0.85">
            {/* Fabric outline clipping group */}
            <mask id="lid-mask">
              <path d="M 185,108 C 185,100 200,85 250,85 C 300,85 315,100 315,108 C 315,115 305,118 250,118 C 195,118 185,115 185,108 Z" fill="#FFF" />
            </mask>
            
            <g mask="url(#lid-mask)">
              {/* Checkered pattern lines */}
              <path d="M180,80 L320,120 M180,95 L320,135 M180,65 L320,105 M180,50 L320,90" stroke="#A4161A" strokeWidth="5.5" opacity="0.6" />
              <path d="M320,80 L180,120 M320,95 L180,135 M320,65 L180,105 M320,50 L180,90" stroke="#A4161A" strokeWidth="5.5" opacity="0.6" />
            </g>
          </g>

          {/* Re-stroke fabric lid border */}
          <path d="M 185,108 C 185,100 200,85 250,85 C 300,85 315,100 315,108 C 315,115 305,118 250,118 C 195,118 185,115 185,108 Z" fill="none" stroke="#5c3821" strokeWidth="3" />

          {/* String ribbon tied around neck */}
          <path d="M 200,116 Q 250,122 300,116" fill="none" stroke="#5c3821" strokeWidth="3.5" />
          
          {/* Ribbon Bow */}
          <circle cx="250" cy="118" r="4.5" fill="#5c3821" />
          <path d="M 250,118 C 242,110 232,115 240,122 Z" fill="none" stroke="#5c3821" strokeWidth="2.5" />
          <path d="M 250,118 C 258,110 268,115 260,122 Z" fill="none" stroke="#5c3821" strokeWidth="2.5" />
          {/* Ribbon tails hanging down */}
          <path d="M 248,120 Q 242,132 235,135" fill="none" stroke="#5c3821" strokeWidth="2" strokeLinecap="round" />
          <path d="M 252,120 Q 258,132 265,135" fill="none" stroke="#5c3821" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Strawberries and blueberries clustered around the jar base */}
        <g id="fruits-cluster">
          {/* Strawberry Left */}
          <g transform="translate(145, 145) rotate(-15) scale(0.95)">
            {/* Strawberry body */}
            <path d="M 35,20 C 35,5 15,5 15,20 C 15,35 25,48 35,55 C 45,48 55,35 55,20 C 55,5 35,5 35,20 Z" fill="#A4161A" stroke="#5c3821" strokeWidth="3" />
            {/* Leaf cap */}
            <path d="M 35,15 C 31,5 24,10 18,12 C 24,18 30,16 35,25 C 40,16 46,18 52,12 C 46,10 39,5 35,15 Z" fill="#2D6A4F" stroke="#5c3821" strokeWidth="2" />
            {/* Strawberry seeds */}
            <circle cx="26" cy="24" r="1.5" fill="#FFB703" />
            <circle cx="35" cy="28" r="1.5" fill="#FFB703" />
            <circle cx="44" cy="24" r="1.5" fill="#FFB703" />
            <circle cx="30" cy="36" r="1.5" fill="#FFB703" />
            <circle cx="39" cy="38" r="1.5" fill="#FFB703" />
            <circle cx="25" cy="45" r="1.2" fill="#FFB703" />
            <circle cx="45" cy="45" r="1.2" fill="#FFB703" />
            <circle cx="35" cy="46" r="1.5" fill="#FFB703" />
          </g>

          {/* Strawberry Right */}
          <g transform="translate(295, 142) rotate(20) scale(0.85)">
            <path d="M 35,20 C 35,5 15,5 15,20 C 15,35 25,48 35,55 C 45,48 55,35 55,20 C 55,5 35,5 35,20 Z" fill="#A4161A" stroke="#5c3821" strokeWidth="3" />
            <path d="M 35,15 C 31,5 24,10 18,12 C 24,18 30,16 35,25 C 40,16 46,18 52,12 C 46,10 39,5 35,15 Z" fill="#2D6A4F" stroke="#5c3821" strokeWidth="2" />
            <circle cx="26" cy="24" r="1.5" fill="#FFB703" />
            <circle cx="35" cy="28" r="1.5" fill="#FFB703" />
            <circle cx="44" cy="24" r="1.5" fill="#FFB703" />
            <circle cx="30" cy="36" r="1.5" fill="#FFB703" />
            <circle cx="39" cy="38" r="1.5" fill="#FFB703" />
            <circle cx="35" cy="46" r="1.5" fill="#FFB703" />
          </g>

          {/* Miniature blueberries */}
          {/* Blue 1 */}
          <circle cx="192" cy="194" r="10" fill="#2A6F97" stroke="#5c3821" strokeWidth="2.5" />
          <path d="M 188,189 Q 192,192 196,189" stroke="#5c3821" strokeWidth="1.5" fill="none" />
          
          {/* Blue 2 */}
          <circle cx="310" cy="190" r="11" fill="#1A3A5F" stroke="#5c3821" strokeWidth="2.5" />
          <path d="M 306,185 Q 310,189 314,185" stroke="#5c3821" strokeWidth="1.5" fill="none" />
          
          {/* Blue 3 */}
          <circle cx="298" cy="198" r="9" fill="#012A4A" stroke="#5c3821" strokeWidth="2.5" />
        </g>

        {/* Elegant waving Ribbon Banner with "Nusa" */}
        <g id="ribbon-banner">
          {/* Left folded back tip */}
          <path d="M 75,250 L 110,225 L 110,265 L 75,285 Z" fill="#801013" stroke="#5c3821" strokeWidth="3" />
          <polygon points="110,265 125,265 125,280" fill="#4a0404" />

          {/* Right folded back tip */}
          <path d="M 425,250 L 390,225 L 390,265 L 425,285 Z" fill="#801013" stroke="#5c3821" strokeWidth="3" />
          <polygon points="390,265 375,265 375,280" fill="#4a0404" />

          {/* Main waving ribbon front banner */}
          <path d="M 100,260 Q 250,225 400,260 L 400,220 Q 250,185 100,220 Z" fill="#FAF3E0" stroke="#5c3821" strokeWidth="4" />
          
          {/* Ribbon inner gold border accent */}
          <path d="M 108,252 Q 250,218 392,252" fill="none" stroke="#D3B89F" strokeWidth="1.5" />
          <path d="M 108,228 Q 250,194 392,228" fill="none" stroke="#D3B89F" strokeWidth="1.5" />

          {/* Elegant script text: Nusa */}
          <text
            x="250"
            y="242"
            fontFamily="'Playfair Display', 'Georgia', serif"
            fontStyle="italic"
            fontSize="54"
            fontWeight="900"
            fill="#5c3821"
            textAnchor="middle"
            filter="drop-shadow(0px 2px 2px rgba(92, 56, 33, 0.2))"
          >
            Nusa
          </text>
        </g>

        {/* Subtitles inside circular area */}
        {/* Subtitle 1: PRODUTO ARTESANAL BRASILEIRO */}
        <text
          x="250"
          y="280"
          fontFamily="'Outfit', 'Inter', sans-serif"
          fontSize="11.5"
          fontWeight="900"
          letterSpacing="4"
          fill="#5c3821"
          textAnchor="middle"
        >
          PRODUTO ARTESANAL BRASILEIRO
        </text>

        {/* Subtitle 2: Geleias zero açúcar (Green elegant cursive brush script) */}
        <text
          x="250"
          y="312"
          fontFamily="'Playfair Display', 'Georgia', serif"
          fontStyle="italic"
          fontSize="24"
          fontWeight="bold"
          fill="#1B4332"
          textAnchor="middle"
        >
          Geleias zero açúcar
        </text>

        {/* Two tiny decorative side branches with leaves around subtitle */}
        <g stroke="#1B4332" strokeWidth="1.5" fill="none" strokeLinecap="round">
          {/* Left branch */}
          <path d="M 115,310 Q 130,314 140,310" />
          <path d="M 125,311 Q 123,306 128,308" fill="#1B4332" />
          <path d="M 134,312 Q 136,307 139,310" fill="#1B4332" />
          {/* Right branch */}
          <path d="M 385,310 Q 370,314 360,310" />
          <path d="M 375,311 Q 377,306 372,308" fill="#1B4332" />
          <path d="M 366,312 Q 364,307 361,310" fill="#1B4332" />
        </g>

      </g>

      {/* Gradients definitions used above */}
      <defs>
        <linearGradient id="jam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D90429" />
          <stop offset="50%" stopColor="#A4161A" />
          <stop offset="100%" stopColor="#590004" />
        </linearGradient>
      </defs>
    </svg>
  );
}
