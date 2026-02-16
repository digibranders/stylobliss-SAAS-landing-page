import svgPaths from "./svg-t0c6jg731i";
import imgImg from "@/assets/div-bg-1.png";
import imgImg1 from "@/assets/div-bg-2.png";
import imgImg2 from "@/assets/div-bg-3.png";

function Div2() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[950px] left-0 top-0 w-[1425px]" data-name="DIV">
      <div className="absolute h-[950px] left-0 pointer-events-none top-0 w-[1425px]" data-name="IMG">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImg} />
        <div aria-hidden="true" className="absolute border-0 border-[#191e49] border-solid inset-0" />
      </div>
    </div>
  );
}

function Source() {
  return <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid left-0 size-[100px] top-0" data-name="SOURCE" />;
}

function Picture() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid left-0 size-[100px] top-[950px]" data-name="PICTURE">
      <Source />
      <div className="absolute h-[950px] left-0 pointer-events-none top-[-950px] w-[1425px]" data-name="IMG">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImg1} />
        <div aria-hidden="true" className="absolute border-0 border-[#191e49] border-solid inset-0" />
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[950px] left-0 overflow-clip top-[-56.3px] w-[1425px]" data-name="DIV">
      <Div2 />
      <div className="absolute h-[950px] left-0 pointer-events-none top-0 w-[1425px]" data-name="IMG">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgImg2} />
        <div aria-hidden="true" className="absolute border-0 border-[rgba(25,30,73,0)] border-solid inset-0" />
      </div>
      <Picture />
    </div>
  );
}

function H() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] h-[16px] left-0 top-0 w-[460px]" data-name="H1">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[16px] leading-[normal] left-0 not-italic text-[#474f7b] text-[14px] top-0 w-[460px] whitespace-pre-wrap">Built for high-performing hair salons</p>
    </div>
  );
}

function H1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] h-[120px] left-0 top-[46px] w-[460px]" data-name="H2">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[120px] leading-[normal] left-0 not-italic text-[#191e49] text-[54px] top-0 w-[460px] whitespace-pre-wrap">{`Unlock your salon's potential`}</p>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] h-[90px] left-0 top-0 w-[460px]" data-name="P">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[90px] leading-[normal] left-0 not-italic text-[#191e49] text-[20px] top-0 w-[460px] whitespace-pre-wrap">Streamline scheduling, enhance client satisfaction, and grow your salon business with the most advanced salon booking and management software.</p>
    </div>
  );
}

function P() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[90px] left-0 top-[196px] w-[460px]" data-name="P">
      <P1 />
    </div>
  );
}

function Div8() {
  return <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid left-0 size-[100px] top-0" data-name="DIV" />;
}

function Div7() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid left-0 size-[100px] top-0" data-name="DIV">
      <Div8 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#bc269b] h-[56px] left-0 overflow-clip rounded-[48px] top-0 w-[219.219px]" data-name="BUTTON">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[56px] leading-[normal] left-[109.61px] not-italic text-[#fcfafa] text-[17px] text-center top-[15px] w-[159.219px] whitespace-pre-wrap">Watch video tour</p>
    </div>
  );
}

function Div9() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[56px] left-0 top-0 w-[219.219px]" data-name="DIV">
      <Button />
    </div>
  );
}

function Div6() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[56px] left-0 top-0 w-[219.219px]" data-name="DIV">
      <Div7 />
      <Div9 />
    </div>
  );
}

function Div5() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[56px] left-0 top-[321px] w-[219.219px]" data-name="DIV">
      <Div6 />
    </div>
  );
}

function Div4() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[377px] left-0 top-[20px] w-[460px]" data-name="DIV">
      <H />
      <H1 />
      <P />
      <Div5 />
    </div>
  );
}

function Div3() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[427px] left-0 top-0 w-[1160px]" data-name="DIV">
      <Div4 />
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute h-[375px] left-0 top-0 w-[50px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 375">
        <g id="SVG">
          <g clipPath="url(#clip0_14_154)">
            <path d={svgPaths.p2b894480} fill="var(--fill-0, #FCFAFA)" id="Vector" />
            <path d="M0 6.6125H50" id="Vector_2" stroke="var(--stroke-0, #FFC9A3)" strokeWidth="37" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_14_154">
            <path d="M0 0H50V375H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Div13() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[375px] left-[2000px] top-0 w-[2000px]" data-name="DIV">
      <Svg />
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute h-[375px] left-0 top-0 w-[2000px]" data-name="SVG">
      <div className="absolute inset-[0_-0.92%_-89.74%_-0.97%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2037.91 711.526">
          <g id="SVG">
            <path d={svgPaths.p1ea3e300} stroke="var(--stroke-0, #191E49)" />
            <path d={svgPaths.p375bcc00} fill="var(--fill-0, #FCFAFA)" id="Vector" />
            <path d={svgPaths.p9af8f20} id="Vector_2" stroke="url(#paint0_linear_14_162)" strokeLinecap="round" strokeWidth="37" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_14_162" x1="297.909" x2="1738.41" y1="265.352" y2="265.352">
              <stop stopColor="#A0A9FC" />
              <stop offset="0.3" stopColor="#C098F5" />
              <stop offset="0.65" stopColor="#FAA4CD" />
              <stop offset="1" stopColor="#FFC9A3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="absolute h-[375px] left-0 top-0 w-[50px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 375">
        <g id="SVG">
          <g clipPath="url(#clip0_14_158)">
            <path d={svgPaths.p2b894480} fill="var(--fill-0, #FCFAFA)" id="Vector" />
            <path d="M0 6.6125H50" id="Vector_2" stroke="var(--stroke-0, #C098F5)" strokeWidth="37" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_14_158">
            <path d="M0 0H50V375H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Div14() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[375px] left-[-2000px] top-0 w-[2000px]" data-name="DIV">
      <Svg2 />
    </div>
  );
}

function Div12() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[375px] left-[-280px] overflow-clip top-0 w-[2000px]" data-name="DIV">
      <Div13 />
      <Svg1 />
      <Div14 />
    </div>
  );
}

function Div11() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[375px] left-[-140px] overflow-clip top-[-129.59px] w-[1440px]" data-name="DIV">
      <Div12 />
    </div>
  );
}

function Div10() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[245.406px] left-0 top-[427px] w-[1160px]" data-name="DIV">
      <Div11 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] border-0 border-[#191e49] border-solid h-[672.406px] left-[132.5px] top-[165px] w-[1160px]" data-name="SECTION">
      <Div3 />
      <Div10 />
    </div>
  );
}

export default function Div() {
  return (
    <div className="bg-[#eef2f6] border-0 border-[#191e49] border-solid relative size-full" data-name="DIV">
      <Div1 />
      <Section />
    </div>
  );
}