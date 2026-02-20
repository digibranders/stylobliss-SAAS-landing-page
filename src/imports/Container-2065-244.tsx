import svgPaths from "./svg-9jwx35fmac";

function Image() {
  return (
    <div className="h-[20.999px] overflow-clip relative shrink-0 w-full" data-name="Image">
      <div className="absolute inset-[4.35%_4.34%_4.35%_4.35%]" data-name="Vector">
        <div className="absolute inset-[-4.76%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9985 20.9985">
            <path d={svgPaths.pf30b00} id="Vector" stroke="var(--stroke-0, #BC269B)" strokeWidth="1.82596" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[31.74%_32.11%_31.77%_36.96%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.49433 7.66127">
          <path d={svgPaths.p8a6a680} fill="var(--fill-0, #BC269B)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5.14px] overflow-clip size-[20.999px] top-[5px]" data-name="Container">
      <Image />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[30.999px] left-0 top-0 w-[199.994px]" data-name="Container">
      <Container2 />
      <p className="-translate-x-1/2 absolute font-['Menlo:Regular',sans-serif] leading-[19.6px] left-[115.13px] not-italic text-[#BC269B] text-[14px] text-center top-[4.33px] tracking-[0.42px] uppercase">{`Watch a video tour `}</p>
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[20.999px] overflow-clip relative shrink-0 w-full" data-name="Image">
      <div className="absolute inset-[4.35%_4.34%_4.35%_4.35%]" data-name="Vector">
        <div className="absolute inset-[-4.76%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9985 20.9985">
            <path d={svgPaths.pf30b00} id="Vector" stroke="var(--stroke-0, #BC269B)" strokeWidth="1.82596" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5.14px] overflow-clip size-[20.999px] top-[5px]" data-name="Container">
      <Image1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0)] h-[30.999px] left-0 top-0 w-[199.994px]" data-name="Button">
      <Container3 />
      <p className="-translate-x-1/2 absolute font-['Menlo:Regular',sans-serif] leading-[19.6px] left-[115.13px] not-italic text-[#BC269B] text-[14px] text-center top-[4.33px] tracking-[0.42px] uppercase">{`Watch a video tour `}</p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container1 />
      <Button />
    </div>
  );
}